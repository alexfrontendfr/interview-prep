import React from "react";
import { Settings, BookOpen, Target } from "lucide-react";
import { Card } from "./ui/Card";

const categories = {
  network: "Network & Connectivity",
  security: "Security & Access",
  hardware: "Hardware & Infrastructure",
  software: "Software & Applications",
  emergency: "Emergency Response",
  maintenance: "System Maintenance",
};

const difficulties = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const StudySettings = ({ onSettingsChange }) => {
  const [settings, setSettings] = React.useState({
    categories: [],
    difficulty: "intermediate",
  });

  const handleCategoryChange = (category) => {
    const newCategories = settings.categories.includes(category)
      ? settings.categories.filter((c) => c !== category)
      : [...settings.categories, category];

    const newSettings = {
      ...settings,
      categories: newCategories,
    };

    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleDifficultyChange = (difficulty) => {
    const newSettings = {
      ...settings,
      difficulty,
    };

    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Card className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <div className="flex items-center mb-4">
        <Settings className="h-5 w-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Study Settings</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="h-4 w-4 inline mr-2" />
            Categories
          </label>
          <div className="space-y-2">
            {Object.entries(categories).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  checked={settings.categories.includes(key)}
                  onChange={() => handleCategoryChange(key)}
                />
                <span className="ml-2 text-sm text-gray-600">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Target className="h-4 w-4 inline mr-2" />
            Difficulty Level
          </label>
          <select
            className="form-select w-full rounded-md border-gray-300 shadow-sm"
            value={settings.difficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
          >
            {Object.entries(difficulties).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};

export default StudySettings;
