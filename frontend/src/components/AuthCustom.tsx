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

type Props = BaseProps & {
  children: ReactNode;
};

const AuthCustom: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Although logoPath is available in global config, the config endpoint is authenticated so cannot be
  // called at this point. Image hard-coded for now.
  const logoSrc = '/ardy_logo.bmp';

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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-aws-squid-ink-light via-aws-sea-blue to-aws-squid-ink p-4">
          <div className="w-full max-w-md rounded-2xl border-2 border-white/20 bg-white p-10 shadow-2xl backdrop-blur-sm dark:bg-aws-squid-ink-dark/90">
            <div className="flex flex-col items-center gap-6">
              {logoSrc && (
                <div className="mb-4">
                  <img
                    src={logoSrc}
                    alt={t('app.name')}
                    className="h-40 w-auto max-w-full drop-shadow-lg"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-aws-squid-ink dark:text-white">
                  {t('app.name')}
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Sign in to continue
                </p>
              </div>
              <Button
                onClick={() => handleSignIn()}
                className="mt-4 w-full rounded-lg px-8 py-3 text-lg font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                {t('signIn.button.login')}
              </Button>
            </div>
          </div>
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
