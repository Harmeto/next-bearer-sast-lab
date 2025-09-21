interface TutorialStepProps {
  step: number;
  title: string;
  description: string;
  content: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
}

export default function TutorialStep({ step, title, description, content, isCompleted = false, isActive = false }: TutorialStepProps) {
  return (
    <div className={`relative ${isActive ? 'bg-blue-50 border-blue-200' : 'bg-white'} rounded-lg shadow-lg p-8 border-2 transition-all duration-200`}>
      {/* Step Number */}
      <div className="flex items-center mb-6">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
          isCompleted 
            ? 'bg-green-100 text-green-800' 
            : isActive 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isCompleted ? '✓' : step}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="ml-14">
        {content}
      </div>

      {/* Progress Line */}
      {!isCompleted && (
        <div className="absolute left-5 top-16 w-0.5 h-full bg-gray-200"></div>
      )}
    </div>
  );
}
