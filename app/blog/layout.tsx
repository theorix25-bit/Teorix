export default function layout ({children}:{children:React.ReactNode}){
  return<>
  <div className="bg-carbon text-white">
    {children}
  </div>
  </>
}