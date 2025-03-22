
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLearningAnalytics } from './hooks/useLearningAnalytics';

const AdaptiveRecommendationsSection: React.FC = () => {
  const { 
    learningPatterns, 
    adaptiveSettings, 
    topPerformingWords,
    strugglingWords,
    isLoading
  } = useLearningAnalytics();

  if (isLoading) {
    return <div>Loading adaptive learning data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adaptive Learning System</CardTitle>
          <CardDescription>How the system adapts to individual learning patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Learning Patterns Detected</h3>
              <div className="space-y-4">
                {learningPatterns.map((pattern, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{pattern.type} Pattern</h4>
                      <Badge variant={pattern.confidence > 70 ? "default" : "outline"}>
                        {pattern.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Mastery Level</span>
                        <span>{pattern.confidence}%</span>
                      </div>
                      <Progress value={pattern.confidence} className="h-2" />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-medium mb-1">Recommended approach:</p>
                      <p className="text-sm">{pattern.recommendedApproach}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">System Adaptations</h3>
              <div className="border rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">Adaptive Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium">Recommended Difficulty</p>
                    <p className="text-base capitalize">{adaptiveSettings.recommendedDifficulty}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Challenge Level</p>
                    <p className="text-base">{adaptiveSettings.challengeLevel}/10</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Hint Frequency</p>
                    <p className="text-base capitalize">{adaptiveSettings.hintFrequency}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Repeat Interval</p>
                    <p className="text-base">{adaptiveSettings.repeatInterval} days</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs font-medium mb-1">Focus Areas:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {adaptiveSettings.focusAreas.map((area, index) => (
                      <Badge key={index} variant="outline">{area}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="performing">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="performing">Top Performing</TabsTrigger>
                  <TabsTrigger value="struggling">Struggling</TabsTrigger>
                </TabsList>
                <TabsContent value="performing" className="mt-4">
                  <div className="space-y-2">
                    {topPerformingWords.map((word, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border-b">
                        <span>{word.text}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{word.accuracy}%</span>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {word.attempts} attempts
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="struggling" className="mt-4">
                  <div className="space-y-2">
                    {strugglingWords.map((word, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border-b">
                        <span>{word.text}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{word.accuracy}%</span>
                          <Badge variant="destructive" className="bg-red-100 text-red-800">
                            {word.attempts} attempts
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveRecommendationsSection;
