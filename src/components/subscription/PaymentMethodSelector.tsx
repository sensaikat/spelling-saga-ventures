
import React from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Check } from 'lucide-react';
import { availablePaymentMethods, PaymentMethodType, PaymentMethod } from '../../utils/payment/paymentMethods';
import { cn } from '../../lib/utils';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
  title?: string;
  className?: string;
}

const PaymentMethodSelector = ({ 
  selectedMethod, 
  onSelectMethod,
  title = 'Payment Method',
  className
}: PaymentMethodSelectorProps) => {
  const methods = availablePaymentMethods();
  
  if (methods.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 border rounded-md">
        No payment methods available
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      {title && <h3 className="text-sm font-medium mb-3">{title}</h3>}
      
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={(value) => onSelectMethod(value as PaymentMethodType)}
        className="grid grid-cols-1 gap-3"
      >
        {methods.map((method) => (
          <PaymentMethodOption 
            key={method.id} 
            method={method}
            isSelected={selectedMethod === method.id}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

interface PaymentMethodOptionProps {
  method: PaymentMethod;
  isSelected: boolean;
}

const PaymentMethodOption = ({ method, isSelected }: PaymentMethodOptionProps) => {
  const Icon = method.icon;
  
  return (
    <div className="flex items-center">
      <RadioGroupItem 
        value={method.id} 
        id={`method-${method.id}`}
        className="peer sr-only" 
      />
      <Label
        htmlFor={`method-${method.id}`}
        className={cn(
          "flex flex-1 items-center gap-3 rounded-md border border-gray-200 p-3 text-sm font-medium cursor-pointer",
          "hover:border-purple-300 hover:bg-purple-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50"
        )}
      >
        <div className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          isSelected ? "bg-purple-100" : "bg-gray-100"
        )}>
          <Icon className={cn(
            "h-5 w-5",
            isSelected ? "text-purple-700" : "text-gray-600"
          )} />
        </div>
        <div className="flex-1">
          <div className="font-medium">{method.name}</div>
          <div className="text-xs text-gray-500">{method.description}</div>
        </div>
        {isSelected && (
          <Check className="h-5 w-5 text-purple-600" />
        )}
      </Label>
    </div>
  );
};

export default PaymentMethodSelector;
