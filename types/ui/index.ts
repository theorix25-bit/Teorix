type ViewTypeTemas = "clases"| "temas" | "subtemas"

type NavItem = {
  url:string
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
};