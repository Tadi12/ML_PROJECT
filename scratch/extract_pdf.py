
import sys
import os
import pypdf

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as f:
        reader = pypdf.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

if __name__ == "__main__":
    pdf_path = r"c:\Users\tadio\Desktop\ml project\Salary Prediction System Using Machine Learning (1).pdf"
    output_path = r"c:\Users\tadio\Desktop\ml project\scratch\extracted_text.txt"
    if os.path.exists(pdf_path):
        text = extract_text_from_pdf(pdf_path)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Text extracted to {output_path}")
    else:
        print(f"File not found: {pdf_path}")
