import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Badge } from './ui/badge';
import { Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useThemeManager } from '../hooks/useThemeManager';
import { toast } from 'sonner';
import ReactGA from 'react-ga4';

interface AIThemeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThemeGenerationResult {
  theme: any;
  description: string;
  rateLimitInfo: {
    remaining: number;
    reset: number;
    limit: number;
  };
}

interface ModelsResponse {
  success: boolean;
  data: {
    models: string[];
    default: string;
    count: number;
  };
}

interface AIModel {
  value: string;
  label: string;
  isDefault: boolean;
}

const LAST_THEME_KEY = 'ai-last-generated-theme';

export const AIThemeGenerator: React.FC<AIThemeGeneratorProps> = ({
  isOpen,
  onClose,
}) => {
  const { applyThemeConfig } = useThemeManager();
  const [description, setDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] =
    useState<ThemeGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);

  // Fetch available models from API
  const fetchModels = async () => {
    setIsLoadingModels(true);
    try {
      const response = await fetch('/api/theme-generator/models', {
        method: 'GET',
      });

      if (response.ok) {
        const data: ModelsResponse = await response.json();
        if (data.success && data.data.models) {
          const models = data.data.models.map(modelName => ({
            value: modelName,
            label: modelName,
            isDefault: modelName === data.data.default,
          }));
          setAvailableModels(models);

          // Set default model as selected
          setSelectedModel(data.data.default);
        }
      } else {
        console.error('Failed to fetch models: API returned error');
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  // Fetch models when component mounts
  useEffect(() => {
    fetchModels();
  }, []);

  // Load saved theme on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LAST_THEME_KEY);
        if (saved) {
          const savedTheme = JSON.parse(saved);
          setLastGenerated(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load saved theme:', error);
      }
    }
  }, []);

  // Apply saved theme on page load
  useEffect(() => {
    if (lastGenerated && typeof window !== 'undefined') {
      const shouldAutoApply =
        localStorage.getItem('ai-theme-auto-apply') !== 'false';
      if (shouldAutoApply) {
        try {
          const themeConfig = {
            name: lastGenerated.theme.name,
            displayName: lastGenerated.theme.displayName,
            colors: lastGenerated.theme.colors,
            fonts: lastGenerated.theme.fonts,
            radius: lastGenerated.theme.radius,
            shadows: lastGenerated.theme.shadows,
            trackingNormal: lastGenerated.theme.trackingNormal || '0em',
            spacing: lastGenerated.theme.spacing || '0.25rem',
          };

          applyThemeConfig(themeConfig);
        } catch (error) {
          console.error('Failed to apply saved theme:', error);
        }
      }
    }
  }, [lastGenerated, applyThemeConfig]);

  const saveThemeToStorage = (themeData: ThemeGenerationResult) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LAST_THEME_KEY, JSON.stringify(themeData));
      } catch (error) {
        console.error('Failed to save theme:', error);
      }
    }
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please provide a description for your theme.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Track theme generation attempt
      ReactGA.event({
        category: 'Theme',
        action: 'AI Theme Generation Attempt',
        label: selectedModel,
        value: 1,
      });

      const response = await fetch('/api/theme-generator/generate-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_description: description.trim(),
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const themeData = {
          theme: data.theme,
          description: data.description,
          rateLimitInfo: data.rateLimitInfo,
        };

        setLastGenerated(themeData);
        saveThemeToStorage(themeData);

        // Auto-apply the generated theme
        try {
          const themeConfig = {
            name: data.theme.name,
            displayName: data.theme.displayName,
            colors: data.theme.colors,
            fonts: data.theme.fonts,
            radius: data.theme.radius,
            shadows: data.theme.shadows,
            trackingNormal: data.theme.trackingNormal || '0em',
            spacing: data.theme.spacing || '0.25rem',
          };

          applyThemeConfig(themeConfig);

          toast.success('Theme generated and applied!', {
            description: `"${themeConfig.displayName}" is now active.`,
          });

          // Track theme application
          ReactGA.event({
            category: 'Theme',
            action: 'AI Generated Theme Auto-Applied',
            label: themeConfig.name,
            value: 1,
          });
        } catch (err) {
          toast.error('Theme generated but failed to apply', {
            description: 'There was an error applying the generated theme.',
          });
        }

        // Track successful generation
        ReactGA.event({
          category: 'Theme',
          action: 'AI Theme Generation Success',
          label: selectedModel,
          value: 1,
        });
      } else {
        // Handle API errors
        let errorMessage = data.error || 'An unexpected error occurred.';

        if (response.status === 429) {
          errorMessage = `Rate limit exceeded. Try again in ${Math.ceil((data.rateLimitInfo?.reset - Date.now() / 1000) / 60)} minutes.`;
        }

        setError(errorMessage);
        toast.error('Failed to generate theme', {
          description: errorMessage,
        });

        // Track generation failure
        ReactGA.event({
          category: 'Theme',
          action: 'AI Theme Generation Error',
          label: `${selectedModel}: ${response.status}`,
          value: 1,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Network error occurred.';
      setError(errorMessage);
      toast.error('Failed to generate theme', {
        description: errorMessage,
      });

      // Track network errors
      ReactGA.event({
        category: 'Theme',
        action: 'AI Theme Generation Network Error',
        label: selectedModel,
        value: 1,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setDescription('');
    setLastGenerated(null);
    setError(null);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Theme Generator
          </SheetTitle>
          <SheetDescription>
            Describe your desired theme and let AI create a custom design for
            you.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Theme Description Input */}
          <div className="space-y-2">
            <Label htmlFor="theme-description">Theme Description</Label>
            <Textarea
              id="theme-description"
              placeholder="Describe your theme, e.g., 'neo brutalism but matrix style' or 'warm sunset colors for a photography portfolio'"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              disabled={isGenerating}
            />
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model-select">
              AI Model{' '}
              {isLoadingModels && (
                <span className="text-xs text-muted-foreground">
                  (Loading...)
                </span>
              )}
            </Label>
            <Select
              value={selectedModel}
              onValueChange={setSelectedModel}
              disabled={
                isGenerating || isLoadingModels || availableModels.length === 0
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    isLoadingModels ? 'Loading models...' : 'Select a model'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableModels.length === 0 ? (
                  <SelectItem value="" disabled>
                    {isLoadingModels
                      ? 'Loading models...'
                      : 'No models available'}
                  </SelectItem>
                ) : (
                  availableModels.map((model: AIModel) => (
                    <SelectItem key={model.value} value={model.value}>
                      <span>
                        {model.label}
                        {model.isDefault && (
                          <span className="text-xs text-muted-foreground ml-2">
                            (Default)
                          </span>
                        )}
                      </span>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !description.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating Theme...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Theme
              </>
            )}
          </Button>

          {/* Generated Theme Result */}
          {lastGenerated && (
            <div className="space-y-4 p-4 rounded-md bg-muted/50 border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="font-medium">
                  {isGenerating
                    ? 'Theme Generated Successfully!'
                    : 'Last Generated Theme'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {lastGenerated.theme.displayName}
                  </Badge>
                  <Badge variant="secondary">AI Generated</Badge>
                </div>

                {lastGenerated.description && (
                  <p className="text-sm text-muted-foreground">
                    {lastGenerated.description}
                  </p>
                )}
              </div>

              {/* Theme Preview Colors */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Color Preview</Label>
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-border"
                    style={{
                      backgroundColor:
                        lastGenerated.theme.colors.light.primary.includes(' ')
                          ? `hsl(${lastGenerated.theme.colors.light.primary})`
                          : lastGenerated.theme.colors.light.primary,
                    }}
                    title="Primary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-border"
                    style={{
                      backgroundColor:
                        lastGenerated.theme.colors.light.secondary.includes(' ')
                          ? `hsl(${lastGenerated.theme.colors.light.secondary})`
                          : lastGenerated.theme.colors.light.secondary,
                    }}
                    title="Secondary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-border"
                    style={{
                      backgroundColor:
                        lastGenerated.theme.colors.light.accent.includes(' ')
                          ? `hsl(${lastGenerated.theme.colors.light.accent})`
                          : lastGenerated.theme.colors.light.accent,
                    }}
                    title="Accent"
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-border"
                    style={{
                      backgroundColor:
                        lastGenerated.theme.colors.light.background.includes(
                          ' '
                        )
                          ? `hsl(${lastGenerated.theme.colors.light.background})`
                          : lastGenerated.theme.colors.light.background,
                    }}
                    title="Background"
                  />
                </div>
              </div>

              {/* Rate Limit Info */}
              {lastGenerated.rateLimitInfo && (
                <div className="text-xs text-muted-foreground">
                  API requests remaining:{' '}
                  {lastGenerated.rateLimitInfo.remaining}/
                  {lastGenerated.rateLimitInfo.limit}
                </div>
              )}

              {/* Reapply Theme Button - Only show if not currently generating */}
              {!isGenerating && (
                <Button
                  onClick={() => {
                    try {
                      const themeConfig = {
                        name: lastGenerated.theme.name,
                        displayName: lastGenerated.theme.displayName,
                        colors: lastGenerated.theme.colors,
                        fonts: lastGenerated.theme.fonts,
                        radius: lastGenerated.theme.radius,
                        shadows: lastGenerated.theme.shadows,
                        trackingNormal:
                          lastGenerated.theme.trackingNormal || '0em',
                        spacing: lastGenerated.theme.spacing || '0.25rem',
                      };

                      applyThemeConfig(themeConfig);

                      toast.success('Theme reapplied!', {
                        description: `"${themeConfig.displayName}" is now active.`,
                      });

                      // Track theme reapplication
                      ReactGA.event({
                        category: 'Theme',
                        action: 'AI Generated Theme Reapplied',
                        label: themeConfig.name,
                        value: 1,
                      });
                    } catch (err) {
                      toast.error('Failed to reapply theme', {
                        description: 'There was an error reapplying the theme.',
                      });
                    }
                  }}
                  className="w-full"
                  variant="outline"
                >
                  Reapply This Theme
                </Button>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
