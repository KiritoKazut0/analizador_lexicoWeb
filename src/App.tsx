import { UserForm } from "./features/Users/presentation/pages/form/Form"
import { UserViewModel } from "./features/Users/presentation/viewModels/viewModelUser"
function App() {

  const userViewModel = new UserViewModel()


  return (
    <>
      <UserForm viewModel={userViewModel} />
    </>
  )
}

export default App
