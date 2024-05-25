import { LogoSVG, nextIconSVG } from 'src/assets/StartPageIcons';

export default function StartPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col	items-center">
        <LogoSVG /> 
        <h1 className="text-[32px] font-bold">SUB</h1>
        {/* <nextIconSVG /> */}
      </div>
    </div>
  );
}