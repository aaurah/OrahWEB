import React, { useState } from 'react';
import { DomainRegistrationForm } from './DomainRegistrationForm';

const RegisterDomain = () => {
  const [domainName, setDomainName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleRegisterDomain = async () => {
    try {
      const registrationResult = await registerDomain(domainName, userEmail);
      console.log(registrationResult);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register Domain</h1>
      <DomainRegistrationForm
        domainName={domainName}
        setDomainName={setDomainName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        handleRegisterDomain={handleRegisterDomain}
      />
    </div>
  );
};

export default RegisterDomain;