import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login: Checking authentication state...");
    
    // Check if user is already logged in
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Login: Auth state changed", { event, session });
      
      if (session) {
        console.log("Login: User is authenticated, redirecting to home");
        navigate("/");
        toast.success("Successfully logged in!");
      }
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Login: Initial session check", { session });
      if (session) {
        console.log("Login: User already has session, redirecting to home");
        navigate("/");
      }
    });

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to CORA</h1>
          <p className="text-white/80">Sign in to continue to your dashboard</p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#8B5CF6',
                    brandAccent: '#7C3AED',
                  },
                },
              },
            }}
            theme="dark"
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Password',
                  button_label: 'Sign In',
                  loading_button_label: 'Signing in...',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your password',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Create a Password',
                  button_label: 'Sign Up',
                  loading_button_label: 'Signing up...',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Create a password',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}