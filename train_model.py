
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import joblib
import os

def run_ml_pipeline():
    print("--- Starting Machine Learning Pipeline ---")
    
    # 1. Load Dataset
    df = pd.read_csv('Salary Data.csv')
    print(f"Dataset loaded. Shape: {df.shape}")
    
    # 2. Data Preprocessing
    # Drop rows with missing values
    df = df.dropna()
    print(f"Rows after dropping missing values: {len(df)}")
    
    # 3. Exploratory Data Analysis (EDA)
    if not os.path.exists('plots'):
        os.makedirs('plots')
        
    # 3.1 Distribution of Salary
    plt.figure(figsize=(10, 6))
    sns.histplot(df['Salary'], kde=True, color='blue')
    plt.title('Salary Distribution')
    plt.savefig('plots/salary_distribution.png')
    plt.close()
    
    # 3.2 Years of Experience vs Salary
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x='Years of Experience', y='Salary', data=df, alpha=0.6)
    plt.title('Experience vs Salary')
    plt.savefig('plots/experience_vs_salary.png')
    plt.close()
    
    # 3.3 Correlation Heatmap
    # Encode for correlation
    temp_df = df.copy()
    le = LabelEncoder()
    for col in ['Gender', 'Education Level', 'Job Title']:
        temp_df[col] = le.fit_transform(temp_df[col])
        
    plt.figure(figsize=(12, 8))
    sns.heatmap(temp_df.corr(), annot=True, cmap='coolwarm', fmt='.2f')
    plt.title('Correlation Heatmap')
    plt.savefig('plots/correlation_heatmap.png')
    plt.close()
    
    print("EDA plots saved to 'plots/' directory.")
    
    # 4. Encoding for Training
    le_gender = LabelEncoder()
    le_education = LabelEncoder()
    le_job = LabelEncoder()
    
    df['Gender_Enc'] = le_gender.fit_transform(df['Gender'])
    df['Education_Enc'] = le_education.fit_transform(df['Education Level'])
    df['Job_Enc'] = le_job.fit_transform(df['Job Title'])
    
    # 5. Feature Selection
    features = ['Age', 'Gender_Enc', 'Education_Enc', 'Job_Enc', 'Years of Experience']
    X = df[features]
    y = df['Salary']
    
    # 6. Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 7. Model Training
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # 8. Evaluation
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print("\n--- Model Performance ---")
    print(f"Mean Absolute Error: ${mae:.2f}")
    print(f"Mean Squared Error: {mse:.2f}")
    print(f"R2 Score: {r2:.2f}")
    
    # 9. Save Artifacts
    if not os.path.exists('model'):
        os.makedirs('model')
        
    joblib.dump(model, 'model/salary_model.pkl')
    joblib.dump(le_gender, 'model/le_gender.pkl')
    joblib.dump(le_education, 'model/le_education.pkl')
    joblib.dump(le_job, 'model/le_job.pkl')
    joblib.dump(features, 'model/features.pkl')
    
    print("\nModel and encoders saved successfully.")
    
    # 10. Sample Predictions
    print("\n--- Sample Predictions ---")
    samples = df.sample(3)
    for i, row in samples.iterrows():
        input_data = np.array([[row['Age'], row['Gender_Enc'], row['Education_Enc'], row['Job_Enc'], row['Years of Experience']]])
        pred = model.predict(input_data)[0]
        print(f"Actual: ${row['Salary']:.2f} | Predicted: ${pred:.2f} | Features: {row['Age']}yrs, {row['Gender']}, {row['Education Level']}, {row['Job Title']}")

if __name__ == "__main__":
    run_ml_pipeline()
