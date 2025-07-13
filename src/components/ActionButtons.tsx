import { 
  Camera, 
  Sparkles, 
  BarChart3, 
  Code, 
  Lightbulb, 
  MoreHorizontal 
} from "lucide-react";

export function ActionButtons() {
  const actions = [
    { icon: Camera, label: "Analyze images", color: "text-purple-400" },
    { icon: Sparkles, label: "Surprise me", color: "text-pink-400" },
    { icon: BarChart3, label: "Analyze data", color: "text-blue-400" },
    { icon: Code, label: "Code", color: "text-green-400" },
    { icon: Lightbulb, label: "Brainstorm", color: "text-yellow-400" },
    { icon: MoreHorizontal, label: "More", color: "text-gray-400" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
      {actions.map((action, index) => (
        <div
          key={action.label}
          className="chatgpt-pill animate-float-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <action.icon className={`w-4 h-4 ${action.color}`} />
          <span className="text-sm">{action.label}</span>
        </div>
      ))}
    </div>
  );
}