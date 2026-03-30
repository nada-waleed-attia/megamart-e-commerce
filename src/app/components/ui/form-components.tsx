import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Validator, ValidationRule, ValidationResult } from '../../utils/validation';

interface FormField {
  value: string;
  error: string;
  touched: boolean;
  validating: boolean;
}

interface FormState {
  fields: Record<string, FormField>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

interface FormContextType {
  formState: FormState;
  setFieldValue: (name: string, value: string) => void;
  setFieldError: (name: string, error: string) => void;
  validateField: (name: string, rules: ValidationRule) => Promise<boolean>;
  validateForm: (rules: Record<string, ValidationRule>) => Promise<boolean>;
  resetForm: (initialValues?: Record<string, string>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
  initialValues?: Record<string, string>;
  onSubmit?: (values: Record<string, string>) => Promise<void>;
  validationRules?: Record<string, ValidationRule>;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialValues = {},
  onSubmit,
  validationRules = {}
}) => {
  const [formState, setFormState] = useState<FormState>(() => {
    const fields: Record<string, FormField> = {};
    
    Object.keys(initialValues).forEach(key => {
      fields[key] = {
        value: initialValues[key] || '',
        error: '',
        touched: false,
        validating: false
      };
    });

    return {
      fields,
      isValid: true,
      isDirty: false,
      isSubmitting: false
    };
  });

  const setFieldValue = (name: string, value: string) => {
    setFormState(prev => {
      const sanitizedValue = Validator.sanitize(value);
      const newFields = {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          value: sanitizedValue,
          touched: true,
          error: '' // Clear error when value changes
        }
      };

      return {
        ...prev,
        fields: newFields,
        isDirty: true
      };
    });
  };

  const setFieldError = (name: string, error: string) => {
    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error
        }
      }
    }));
  };

  const validateField = async (name: string, rules: ValidationRule): Promise<boolean> => {
    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          validating: true
        }
      }
    }));

    const fieldValue = formState.fields[name]?.value || '';
    const error = Validator.validate(fieldValue, rules, name);

    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error: error || '',
          validating: false
        }
      }
    }));

    return !error;
  };

  const validateForm = async (rules: Record<string, ValidationRule>): Promise<boolean> => {
    const errors: Record<string, string> = {};
    
    // Validate all fields
    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const fieldValue = formState.fields[fieldName]?.value || '';
      const error = Validator.validate(fieldValue, fieldRules, fieldName);
      
      if (error) {
        errors[fieldName] = error;
      }
    }

    // Update form state with errors
    setFormState(prev => {
      const newFields = { ...prev.fields };
      
      Object.keys(errors).forEach(fieldName => {
        newFields[fieldName] = {
          ...newFields[fieldName],
          error: errors[fieldName]
        };
      });

      return {
        ...prev,
        fields: newFields,
        isValid: Object.keys(errors).length === 0
      };
    });

    return Object.keys(errors).length === 0;
  };

  const resetForm = (initialValues?: Record<string, string>) => {
    const values = initialValues || {};
    const fields: Record<string, FormField> = {};
    
    Object.keys(values).forEach(key => {
      fields[key] = {
        value: values[key] || '',
        error: '',
        touched: false,
        validating: false
      };
    });

    setFormState({
      fields,
      isValid: true,
      isDirty: false,
      isSubmitting: false
    });
  };

  const setSubmitting = (isSubmitting: boolean) => {
    setFormState(prev => ({
      ...prev,
      isSubmitting
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onSubmit) return;

    setSubmitting(true);

    try {
      // Validate form
      const isValid = await validateForm(validationRules);
      
      if (isValid) {
        const values = Object.keys(formState.fields).reduce((acc, key) => {
          acc[key] = formState.fields[key].value;
          return acc;
        }, {} as Record<string, string>);
        
        await onSubmit(values);
      }
    } catch (error) {
      // TODO: Handle form submission errors
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        setFieldValue,
        setFieldError,
        validateField,
        validateForm,
        resetForm,
        setSubmitting
      }}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

// Form field component
interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validationRules?: ValidationRule;
  children?: (field: FormField) => ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className = '',
  validationRules,
  children
}) => {
  const { formState, setFieldValue, validateField } = useForm();
  const field = formState.fields[name] || {
    value: '',
    error: '',
    touched: false,
    validating: false
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFieldValue(name, e.target.value);
    
    // Validate field if rules are provided and field has been touched
    if (validationRules && field.touched) {
      await validateField(name, validationRules);
    }
  };

  const handleBlur = async () => {
    // Validate field on blur if rules are provided
    if (validationRules) {
      await validateField(name, validationRules);
    }
  };

  if (children) {
    return <>{children(field)}</>;
  }

  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={field.value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={field.error ? 'error' : ''}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={field.value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={field.error ? 'error' : ''}
        />
      )}
      
      {field.validating && (
        <div className="field-validating">Validating...</div>
      )}
      
      {field.error && (
        <div className="field-error">{field.error}</div>
      )}
    </div>
  );
};

// Form submit button component
interface FormSubmitProps {
  children: ReactNode;
  disabled?: boolean;
  loadingText?: string;
  className?: string;
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
  children,
  disabled = false,
  loadingText = 'Submitting...',
  className = ''
}) => {
  const { formState } = useForm();
  
  const isDisabled = disabled || formState.isSubmitting || !formState.isValid;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={className}
    >
      {formState.isSubmitting ? loadingText : children}
    </button>
  );
};

// Form error summary component
export const FormErrorSummary: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { formState } = useForm();
  
  const errors = Object.entries(formState.fields)
    .filter(([_, field]) => field.error)
    .map(([name, field]) => field.error);

  if (errors.length === 0) return null;

  return (
    <div className={`form-error-summary ${className}`}>
      <h4>Please correct the following errors:</h4>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};
