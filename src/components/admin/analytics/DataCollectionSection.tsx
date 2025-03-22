
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const DataCollectionSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Collection Overview</CardTitle>
          <CardDescription>How learning data is collected and processed</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Privacy-First Approach</AlertTitle>
            <AlertDescription>
              All learning data is anonymized and stored securely. Users must opt-in to personalization features.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="collection">
                <AccordionTrigger>What data is collected?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p>For each word attempt, the system collects:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Word metadata (ID, difficulty)</li>
                      <li>Whether the attempt was correct</li>
                      <li>Time spent on the word</li>
                      <li>Number of hints used</li>
                      <li>Language being practiced</li>
                      <li>Common mistake patterns (when identified)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="analytics">
                <AccordionTrigger>How is this data analyzed?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p>The learning analytics system processes the collected data to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Identify learning patterns and trends</li>
                      <li>Detect strengths and weaknesses</li>
                      <li>Generate personalized recommendations</li>
                      <li>Adapt difficulty levels based on performance</li>
                      <li>Optimize future word selection for maximum learning</li>
                    </ul>
                    <p className="mt-2">Pattern detection algorithms look for:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Phonetic patterns (difficulty with similar sounds)</li>
                      <li>Visual patterns (difficulty with similar looking words)</li>
                      <li>Structural patterns (difficulty with word length/complexity)</li>
                      <li>Memory patterns (recall ability over time)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="usage">
                <AccordionTrigger>How is this data used to improve learning?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p>The analyzed data powers several adaptive learning features:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Personalized Word Selection:</strong> Focusing on areas that need improvement</li>
                      <li><strong>Adaptive Difficulty:</strong> Automatically adjusting challenge levels</li>
                      <li><strong>Smart Repetition:</strong> Scheduling words for review at optimal intervals</li>
                      <li><strong>Learning Insights:</strong> Providing actionable feedback to learners</li>
                      <li><strong>Targeted Practice:</strong> Creating custom exercises for weak areas</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="privacy">
                <AccordionTrigger>Privacy and Data Protection</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p>Our system implements several privacy-enhancing measures:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Double-hashing of user identifiers</li>
                      <li>End-to-end encryption of learning data</li>
                      <li>Automatic data purging after 90 days of inactivity</li>
                      <li>Granular privacy controls for users</li>
                      <li>Option to export or delete all personal data</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCollectionSection;
