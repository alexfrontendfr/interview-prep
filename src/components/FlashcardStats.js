import React from "react";
import { Award, CheckCircle, Brain } from "lucide-react";
import { Card } from "./ui/Card";

const FlashcardStats = ({ progress, totalQuestions }) => {
  const accuracy =
    progress.correct + progress.incorrect > 0
      ? Math.round(
          (progress.correct / (progress.correct + progress.incorrect)) * 100
        )
      : 0;

  const stats = [
    {
      label: "Streak",
      value: progress.streak || 0,
      icon: Award,
      color: "text-yellow-500",
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Progress",
      value: `${progress.correct + progress.incorrect}/${totalQuestions}`,
      icon: Brain,
      color: "text-blue-500",
    },
  ];

  return (
    <Card className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="text-center">
            <div className={`flex justify-center mb-1 sm:mb-2 ${color}`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600">{label}</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">
              {value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FlashcardStats;
