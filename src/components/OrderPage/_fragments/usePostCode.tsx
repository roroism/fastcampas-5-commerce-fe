import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const usePostcode = () => {
  const open = useDaumPostcodePopup();
  const [fullAddress, setFullAddress] = useState();
  const [zonecode, setZoneCode] = useState();
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setFullAddress(fullAddress);
    setZoneCode(data.zonecode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return { handleClick, fullAddress, zonecode };
};

export default usePostcode;
