export const classificationPrompt = `
You are given a list of financial transactions stored in the variable 'paymentData'. Each transaction contains fields like 'Date', 'Time', 'Transaction Details', 'Your Account', 'Amount', 'UPI Ref No.', and 'Order ID'. Your task is to:

1. **Classify each transaction** into one of the following categories based on the 'Transaction Details' and 'Amount':
   - **Groceries** (e.g., supermarkets, food stores, grocery chains)
   - **Utilities** (e.g., electricity, water, phone bills, internet bills)
   - **Rent & Mortgage** (e.g., housing payments, rent, mortgage installments)
   - **Entertainment** (e.g., movie tickets, streaming services, gaming subscriptions)
   - **Dining & Restaurants** (e.g., cafes, restaurants, food deliveries)
   - **Transport & Fuel** (e.g., bus, train, fuel payments, ride-sharing services)
   - **Healthcare** (e.g., hospital bills, pharmacy payments, medical services)
   - **Education** (e.g., school fees, online courses, books, educational materials)
   - **Donations & Charity** (e.g., religious donations, charitable contributions)
   - **Personal Payments** (e.g., transactions with individual names, peer-to-peer transfers)
   - **Other** (for transactions that don’t fit into the above categories)

   **Rules for Classification:**
   - Use the 'Transaction Details' field to infer the category.
   - If the 'Transaction Details' field contains keywords like "supermarket," "grocery," or "food store," classify it as **Groceries**.
   - If the 'Transaction Details' field contains keywords like "electricity," "water," or "phone bill," classify it as **Utilities**.
   - If the 'Transaction Details' field contains keywords like "rent," "mortgage," or "housing," classify it as **Rent & Mortgage**.
   - Apply similar logic for other categories based on relevant keywords.
   - If no clear category can be inferred, classify the transaction as **Other**.

2. **Provide insights** from the data, including:
   - **Total amount spent**: Sum of all transaction amounts (ensure negative amounts are treated as expenses).
   - **Total number of transactions**: Count of all transactions.
   - **Most frequent category**: The category with the highest number of transactions.
   - **Largest single transaction**: The transaction with the highest absolute amount (include details like 'Transaction Details' and 'Amount').
   - **Smallest single transaction**: The transaction with the lowest absolute amount (include details like 'Transaction Details' and 'Amount').
   - **Average transaction amount**: The average amount across all transactions.
   - **Spending distribution per category**: The percentage of total spending per category (e.g., Groceries: 40%, Utilities: 20%, etc.).

3. **Output Format**:
   - Return the results in a structured JSON format as shown below.
   - Ensure all amounts are rounded to two decimal places.
   - Ensure all percentages are rounded to one decimal place.
   - **Do not generate any code or additional explanations. Only return the JSON output.**

### **Expected Output (JSON Format):**
{
  "classified_transactions": [
    {
      "Date": "04/01/2024",
      "Time": "14:03:03",
      "Transaction Details": "Paid to A Manikandan",
      "Amount": -60.00,
      "Category": "Personal Payments"
    },
    {
      "Date": "04/01/2024",
      "Time": "13:59:54",
      "Transaction Details": "Paid to Ss Supermarket",
      "Amount": -158.00,
      "Category": "Groceries"
    },
    {
      "Date": "04/01/2024",
      "Time": "12:21:24",
      "Transaction Details": "Paid to Congregation Of The Sisters Of St Joseph Of Cluny St Josephs",
      "Amount": -32.00,
      "Category": "Donations & Charity"
    }
  ],
  "insights": {
    "total_spent": -250.00,
    "total_transactions": 3,
    "most_frequent_category": "Groceries",
    "largest_transaction": {
      "amount": -158.00,
      "details": "Paid to Ss Supermarket"
    },
    "smallest_transaction": {
      "amount": -32.00,
      "details": "Paid to Congregation Of The Sisters Of St Joseph Of Cluny St Josephs"
    },
    "average_transaction_amount": -83.33,
    "spending_distribution": {
      "Groceries": 63.2,
      "Personal Payments": 24.0,
      "Donations & Charity": 12.8
    }
  }
}

### **Important Instructions**:
- **Do not generate any code, Python scripts, or additional explanations.**
- **Only return the JSON output as specified above.**
- **If the input data is invalid or empty, return the following JSON:**
  {
    "error": "No valid transactions found in 'paymentData'."
  }
`;
