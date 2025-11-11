import React, {
  ReactNode,
  useState,
  useEffect,
  cloneElement,
  ReactElement,
} from 'react';
import Button from './Button';
import { BaseProps } from '../@types/common';
import { getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useTranslation } from 'react-i18next';
import { PiCircleNotch } from 'react-icons/pi';
import useGlobalConfig from '../hooks/useGlobalConfig';

type Props = BaseProps & {
  children: ReactNode;
};

const AuthCustom: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { getGlobalConfig } = useGlobalConfig();
  const { data: globalConfig } = getGlobalConfig();
  const logoSrc = globalConfig?.logoPath ?? '';

  useEffect(() => {
    getCurrentUser()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSignIn = () => {
    signInWithRedirect({
      provider: {
        custom: import.meta.env.VITE_APP_CUSTOM_PROVIDER_NAME,
      },
    });
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center p-4">
          <div className="mb-3 text-4xl">Loading...</div>
          <div className="animate-spin">
            <PiCircleNotch size={100} />
          </div>
        </div>
      ) : !authenticated ? (
        <div className="flex flex-col items-center gap-4">
          {logoSrc && (
              <div className="mb-3 mt-10">
                <img
                    src={logoSrc}
                    alt={t('app.name')}
                    className="h-20 w-auto max-w-[250px]"
                    loading="lazy"
                />
              </div>
          )}
          <div className="mb-5 mt-10 text-4xl text-aws-squid-ink-light">
            {t('app.name')}
          </div>
          <Button onClick={() => handleSignIn()} className="px-20 text-xl bg-aws-squid-ink-light">
            {t('signIn.button.login')}
          </Button>
        </div>
      ) : (
        // Pass the signOut function to the child component
        <>
          {cloneElement(children as ReactElement, { signOut: handleSignOut })}
        </>
      )}
    </>
  );
};

export default AuthCustom;
