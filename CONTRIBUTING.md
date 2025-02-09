# Contributing to BookItNow

We love your input! We want to make contributing to BookItNow as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define interfaces for all props and state
- Use type inference where possible
- Document complex types

Example:
```typescript
interface UserProps {
  name: string;
  email: string;
  role: 'admin' | 'user';
  onUpdate?: (user: User) => void;
}

const UserProfile: React.FC<UserProps> = ({ name, email, role, onUpdate }) => {
  // Component implementation
};
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Implement error boundaries
- Follow React best practices

Example:
```typescript
const BookingCard: React.FC<BookingProps> = ({ booking }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-4 rounded-xl ${
      theme === "dark" ? "bg-white/5" : "bg-white"
    }`}>
      {/* Component content */}
    </div>
  );
};
```

### CSS/Tailwind

- Use Tailwind CSS classes
- Follow mobile-first approach
- Use semantic class names
- Keep styles modular
- Use CSS variables for theming

Example:
```typescript
const Button: React.FC<ButtonProps> = ({ variant = "primary", children }) => {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg font-medium transition-all
        ${variant === "primary" 
          ? "bg-indigo-500 text-white hover:bg-indigo-600" 
          : "bg-gray-100 text-gray-900 hover:bg-gray-200"}
      `}
    >
      {children}
    </button>
  );
};
```

### File Structure

```
src/
├── components/
│   ├── ComponentName/
│   │   ├── index.tsx
│   │   ├── ComponentName.tsx
│   │   └── ComponentName.test.tsx
│   └── ...
├── hooks/
│   └── useHookName.ts
└── utils/
    └── utilityName.ts
```

### Naming Conventions

- Components: PascalCase
- Files: kebab-case
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: lowercase with hyphens

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
feat: add booking confirmation email

- Implement email template
- Add SendGrid integration
- Update user notification preferences

Fixes #123
```

### Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the documentation with any new environment variables, exposed ports, etc.
3. The PR may be merged once you have the sign-off of two other developers
4. Follow the PR template provided

### Issue Reporting

1. Use the issue template provided
2. Include steps to reproduce
3. Include expected vs actual behavior
4. Include screenshots if relevant
5. Include browser/OS details

## Testing Guidelines

### Unit Tests

- Write tests for all new features
- Use Jest and React Testing Library
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test edge cases

Example:
```typescript
describe('BookingForm', () => {
  it('should validate required fields', () => {
    const { getByRole, getByText } = render(<BookingForm />);
    
    fireEvent.click(getByRole('button', { name: /submit/i }));
    
    expect(getByText(/name is required/i)).toBeInTheDocument();
  });
});
```

### Integration Tests

- Test component interactions
- Test API integrations
- Test routing behavior
- Test state management

### E2E Tests

- Use Cypress for E2E testing
- Cover critical user flows
- Test on multiple browsers
- Test responsive behavior

## Documentation

### Code Comments

- Use JSDoc for function documentation
- Explain complex logic
- Document workarounds
- Include links to relevant resources

Example:
```typescript
/**
 * Calculates the total price of a booking including taxes and fees
 * @param {Booking} booking - The booking object
 * @param {PriceOptions} options - Price calculation options
 * @returns {number} Total price in cents
 */
const calculateTotalPrice = (booking: Booking, options: PriceOptions): number => {
  // Implementation
};
```

### Component Documentation

- Document props
- Include usage examples
- Document side effects
- List dependencies

Example:
```typescript
/**
 * PaymentForm component handles payment processing using Stripe
 * 
 * @example
 * <PaymentForm
 *   amount={1000}
 *   currency="USD"
 *   onSuccess={handleSuccess}
 * />
 */
```

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs) 