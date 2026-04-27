import PredictionForm from '@/components/prediction/PredictionForm';

export default function PredictPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-130px)] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Salary Predictor
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Fill in your details below and our AI will calculate your expected market value based on current industry trends.
        </p>
      </div>

      <div className="flex-grow flex items-start justify-center pb-12">
        <PredictionForm />
      </div>
    </div>
  );
}
