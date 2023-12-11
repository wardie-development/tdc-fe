import './styles/CompatibilityBrandsTitle.css';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

export const CompatibilityBrandsTitle = ({screenProtector}) => {
  return (
    <div className='compatibilitiesTitleGroup' style={{backgroundColor: screenProtector.color}}>
      <AddToHomeScreenIcon style={{color:'#fff'}}/>
      <h3 className='compatibilitiesTitleGroup__title'>{screenProtector.title}</h3>
    </div>
  );
}
