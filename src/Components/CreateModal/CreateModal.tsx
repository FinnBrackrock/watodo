import './create-modal.css'
import { AiOutlineClose } from 'react-icons/ai'

type CreateModalProps = {
    children: JSX.Element;
    closeModal: Function;
  };

const CreateModal = ({ children, closeModal }: CreateModalProps) => {
  return (
    <div className="modal">
      <AiOutlineClose onClick={() => closeModal()} size={20} className='closeIcon'/>
      {children}
    </div>
  )
}

export default CreateModal