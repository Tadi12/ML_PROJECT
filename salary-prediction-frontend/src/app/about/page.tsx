import { Brain, Database, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 bg-white min-h-[calc(100vh-130px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            About Our AI Model
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Understanding how we predict your earning potential.
          </p>
        </div>

        <div className="prose prose-blue prose-lg mx-auto text-slate-600">
          <p className="lead text-xl font-medium text-slate-800">
            Our Salary Prediction System leverages advanced machine learning algorithms trained on verified global compensation data to provide you with the most accurate salary estimates possible.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How It Works</h2>
          <p>
            When you submit your profile details, our model evaluates multiple factors simultaneously. We look beyond just your job title, analyzing the intersection of your experience level, educational background, and specific role requirements. 
          </p>
          <p>
            The core engine uses a Gradient Boosting Regressor, continuously updated with new market data to account for economic shifts, inflation, and changing industry demands.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 m-0 mb-2">Vast Dataset</h3>
              <p className="text-sm m-0">Trained on over 5 million verified salary records from the tech industry worldwide.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 m-0 mb-2">Smart Analysis</h3>
              <p className="text-sm m-0">Recognizes non-linear relationships between skills, experience, and compensation.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 m-0 mb-2">Privacy First</h3>
              <p className="text-sm m-0">We don't sell your personal data. All predictions are anonymous and secure.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Accuracy and Limitations</h2>
          <p>
            While our model boasts an 85% accuracy rate within a 10% margin of error, it's important to remember that these are estimates. Individual compensation can vary based on factors our model cannot see, such as:
          </p>
          <ul>
            <li>Your negotiation skills and interview performance</li>
            <li>Specific company size and current funding stage</li>
            <li>Equity, bonuses, and comprehensive benefits packages</li>
            <li>Urgency of the hiring company</li>
          </ul>
          <p>
            Use our predictions as a strong baseline for your research and negotiations, not as an absolute ceiling or floor.
          </p>
        </div>
      </div>
    </div>
  );
}
