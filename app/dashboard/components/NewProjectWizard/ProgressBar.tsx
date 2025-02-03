interface ProgressBarProps {
    steps: { id: number; name: string }[];
    currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step.id === currentStep
                                ? 'bg-black text-white'
                                : step.id < currentStep
                                    ? 'bg-gray-200 text-gray-700'
                                    : 'bg-gray-100 text-gray-400'
                            }`}>
                            {step.id}
                        </div>
                        <span className={`ml-2 text-sm ${step.id === currentStep
                                ? 'text-black font-medium'
                                : 'text-gray-500'
                            }`}>
                            {step.name}
                        </span>
                        {index < steps.length - 1 && (
                            <div className={`w-12 h-0.5 mx-2 ${step.id < currentStep
                                    ? 'bg-gray-200'
                                    : 'bg-gray-100'
                                }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 