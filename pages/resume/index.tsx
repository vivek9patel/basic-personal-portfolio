import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Download, ExternalLink, FileText, Eye, Loader2 } from "lucide-react";

const Resume: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/resume", title: "Resume" });
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleViewFullPage = () => {
    ReactGA.event({
      category: "Button.Click",
      action: "Full Screen Resume",
    });
    window.open("/vivek_patel_resume.pdf", "_blank");
  };

  const handleDownload = () => {
    ReactGA.event({
      category: "Button.Click",
      action: "Download Resume",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Download my complete resume or view it directly in your browser. 
          Updated with my latest experience and skills.
        </p>
        <Badge variant="secondary" className="mt-2">
          Last Updated: 08/09/2024
        </Badge>
      </div>

      {/* Action Buttons */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription>
            Choose how you'd like to view or download my resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleViewFullPage}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Full Page
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open PDF in a new tab for better viewing experience</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="/vivek_patel_resume.pdf" download onClick={handleDownload}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                      data-cursor={true}
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download PDF to your device</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Resume Preview Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <CardTitle>Resume Preview</CardTitle>
          </div>
          <CardDescription>
            Preview of my resume document. For best viewing experience, use the full page view.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading resume...</p>
                </div>
              </div>
            )}
            
            {hasError ? (
              <div className="h-96 flex flex-col items-center justify-center text-center p-8">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Unable to display PDF</h3>
                <p className="text-muted-foreground mb-4">
                  Your browser might not support PDF viewing. Please try one of the options below:
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleViewFullPage} variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View in New Tab
                  </Button>
                  <a href="/vivek_patel_resume.pdf" download onClick={handleDownload}>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src="/vivek_patel_resume.pdf"
                width="100%"
                height="800"
                className="border-0 rounded-lg"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Resume PDF Preview"
                aria-label="Resume document preview"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Having trouble viewing the document? Try{" "}
          <button
            onClick={handleViewFullPage}
            className="text-primary hover:underline font-medium"
          >
            opening it in a new tab
          </button>{" "}
          or{" "}
          <a
            href="/vivek_patel_resume.pdf"
            download
            onClick={handleDownload}
            className="text-primary hover:underline font-medium"
          >
            downloading the PDF
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Resume;
