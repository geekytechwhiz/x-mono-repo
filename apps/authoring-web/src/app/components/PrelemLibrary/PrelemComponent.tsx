import { unstable_ClassNameGenerator } from "@mui/material/utils";
// call this function at the root of the application
unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "Platform-x-"),
);

function PrelemComponent() {
  return (
    <div className='App'>
       Nothing
    </div>
  );
}

export default PrelemComponent;
