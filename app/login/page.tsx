import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Connexion · MCT2000" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
