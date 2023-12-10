import './styles/CompatibilityBrandsTitle.css';

export const CompatibilityBrandsTitle = ({screenProtector}) => {
  return (
    <div className='compatibilitiesTitleGroup' style={{backgroundColor: screenProtector.color}}>
      <div style={{width: 15, height: 15, border: "2px solid #fff", borderRadius: 5}}></div>
      <h3 className='compatibilitiesTitleGroup__title'>{screenProtector.title}</h3>
    </div>
  );
}