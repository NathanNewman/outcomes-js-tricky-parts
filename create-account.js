function createAccount(pin, initialDeposit) {
    let balance = initialDeposit || 0;
  
    return {
      checkBalance: function(inputPin) {
        if (inputPin === pin) {
            if(balance) return `$${balance}`;
            return '$0';
        } else {
          return "Invalid PIN.";
        }
      },
      deposit: function(inputPin, amount) {
        if (inputPin === pin) {
          balance += amount;
          return `Successfully deposited $${amount}. Current balance: $${balance}.`;
        } else {
          return "Invalid PIN.";
        }
      },
      withdraw: function(inputPin, amount) {
        if (inputPin === pin) {
          if (amount <= balance) {
            balance -= amount;
            return `Successfully withdrew $${amount}. Current balance: $${balance}.`;
          } else {
            return "Withdrawal amount exceeds account balance. Transaction cancelled.";
          }
        } else {
          return "Invalid PIN.";
        }
      },
      changePin: function(oldPin, newPin) {
        if (oldPin === pin) {
          pin = newPin;
          return "PIN successfully changed!";
        } else {
          return "Invalid PIN.";
        }
      }
    };
  }

module.exports = { createAccount };
