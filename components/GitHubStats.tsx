import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Star, Users } from "lucide-react";

interface GitHubStatsProps {
  username: string;
}

interface GitHubStats {
  followers: number;
  stars: number;
}

export default function GitHubStats({ username }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data for followers
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Fetch repositories to calculate total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        
        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        
        setStats({
          followers: userData.followers,
          stars: totalStars,
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Set to null if API fails - don't show badges
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-16"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-16"></div>
        </div>
      </div>
    );
  }

  // Don't render anything if API failed or no stats
  if (!stats) {
    return null;
  }

  // Only show badges with counts > 0
  const showFollowers = stats.followers > 0;
  const showStars = stats.stars > 0;

  // Don't render anything if both counts are 0
  if (!showFollowers && !showStars) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {showFollowers && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <Users className="h-2.5 w-2.5" />
                  <span>{stats.followers}</span>
                </Badge>
              </a>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom"
              className="bg-secondary text-secondary-foreground"
            >
              <p>GitHub Followers</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {showStars && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href={`https://github.com/${username}?tab=repositories&q=&type=&language=&sort=stargazers`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <Star className="h-2.5 w-2.5" />
                  <span>{stats.stars}</span>
                </Badge>
              </a>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom"
              className="bg-secondary text-secondary-foreground"
            >
              <p>Total Repository Stars</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
} 