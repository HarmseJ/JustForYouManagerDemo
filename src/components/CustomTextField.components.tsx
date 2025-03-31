import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GlobalProvider } from '../global/GlobalProvider.global';

type FieldLocation = 'image' | 'title' | 'message';

export default function CustomTextField(props: { location: FieldLocation }) {
  const { location } = props;
  const { data, setData } = GlobalProvider();

  const fieldValue = data && data[0] ? data[0][location] : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);

    setData((prevData) => {
      if (!prevData || !prevData[0]) {
        return [{
          image: location === 'image' ? value : '',
          title: location === 'title' ? value : '',
          message: location === 'message' ? value : '',
        }];
      }
    
      const newData = [...prevData];
      if (location === 'image') {
        newData[0].image = value;
      } else if (location === 'title') {
        newData[0].title = value;
      } else if (location === 'message') {
        newData[0].message = value;
      } else {
        console.error('Invalid location prop');
      }
    
      return newData;
    });
  };

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id={`standard-${location}`} 
        label={location === 'image' ? 'Image URL' : location.charAt(0).toUpperCase() + location.slice(1)}
        variant="outlined" 
        multiline
        value={fieldValue}
        onChange={handleChange}
      />
    </Box>
  );
}