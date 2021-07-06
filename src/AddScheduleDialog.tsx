import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CloseIcon from '@material-ui/icons/Close';
import PlaceIcon from '@material-ui/icons/Place';
import NotesIcon from '@material-ui/icons/Notes';
import styled from 'styled-components';

// スタイリングはこれからやる必要あり。。。
export const AddScheduleDialog = () => {
  const SpaceAndDelete = () => {
    return (
      <div>
        <div>
          <button>
            <span>
              <CloseIcon />
            </span>
            <span></span>
          </button>
        </div>
      </div>
    );
  };

  const AddScheduleTitle = () => {
    return (
      <div>
        <input />
      </div>
    );
  };

  const AddScheduleDate = () => {
    return (
      <div>
        <div>
          <AccessTimeIcon />
        </div>
        <div>
          <div>
            <div>
              <input />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddSchedulePlace = () => {
    return (
      <div>
        <div>
          <PlaceIcon />
        </div>
        <div>
          <div>
            <div>
              <input />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddScheduleDescription = () => {
    return (
      <div>
        <div>
          <NotesIcon />
        </div>
        <div>
          <div>
            <div>
              <input />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SpaceAndSave = () => {
    return (
      <div>
        <button>
          <span>保存</span>
          <span></span>
        </button>
      </div>
    );
  };

  return (
    <div className='MuiDialog-root' style={{ position: 'fixed', zIndex: 1300, inset: '0px' }}>
      <div className='MuiBackdrop-root' aria-hidden='true'>
        <div className='MuiDialog-container MuiDialog-scrollPaper' role='none presentation'>
          <div>
            <SpaceAndDelete />
          </div>
          <div>
            <AddScheduleTitle />
            <AddScheduleDate />
            <AddSchedulePlace />
            <AddScheduleDescription />
          </div>
          <div>
            <SpaceAndSave />
          </div>
        </div>
      </div>
    </div>
  );
};
