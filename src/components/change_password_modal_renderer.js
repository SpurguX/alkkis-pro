"Use strict";

import { useSelector } from 'react-redux'
import ChangePasswordModal from './change_password_modal'

const ChangePasswordModalRenderer = props => {
  const showChangePasswordModal = useSelector(state => state.changePasswordModal.show);

  return showChangePasswordModal ? <ChangePasswordModal /> : null;
}

export default ChangePasswordModalRenderer;
