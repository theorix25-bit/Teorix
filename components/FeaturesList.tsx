// Ejemplo de cómo consumir met_features_list en tu Landing 
const FeaturesList = ({ data }:{data:any}) => {
  return (
    <ul className="space-y-4">
      {data.metadata.items.map((item:any, i:number) => (
        <li key={i} className="flex items-center gap-3 text-white font-medium text-lg">
          <span className="text-2xl">{item.icon}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};