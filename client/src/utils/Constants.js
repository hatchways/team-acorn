export const languages = [
  "javascript",
  "java",
  "c++",
  "csharp",
  "c",
  "python",
  "html",
  "css",
];

export const ReviewsData = [
  {
    review_id: "123456",
    submitted_date: "10 Jan 2020",
    title: "Animation",
    code: `
\`\`\`
// Your First Program

class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}
// Your First Program

# This program adds two numbers

num1 = 1.5
num2 = 6.3

# Add two numbers
sum = num1 + num2

# Display the sum
print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))
\`\`\`
`,
    language: "Java",
    review_messages: [],
  },
  {
    review_id: "923456",
    submitted_date: "11 Jan 2020",
    title: "Interative music Player",
    code: () =>
      toString(
        ```
// Your First Program

# This program adds two numbers

num1 = 1.5
num2 = 6.3

# Add two numbers
sum = num1 + num2

# Display the sum
print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))

```
      ),
    language: "Python",
    review_messages: [],
  },
  {
    review_id: "123456",
    submitted_date: "10 Jan 2020",
    title: "Something Else",
    code: `
\`\`\`
// Your First Program

class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}
\`\`\`
`,
    language: "Java",
    review_messages: [],
  },
];
