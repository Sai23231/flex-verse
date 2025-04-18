import React, { useState } from 'react';

import { FormControl, InputLabel, Menu, Select } from '@mui/material';

interface FilterDropdownProps {
  filterType: string;
  component: (props: { handleClose: () => void }) => JSX.Element;
}

const FilterDropdown: React.FC<FilterDropdownProps> = (props) => {
  const { filterType, component } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <FormControl variant="outlined" sx={{ width: 270, mr: 8, margin: '5px' }}>
        <InputLabel>{filterType}</InputLabel>
        <Select onClick={handleOpen} value="" />
      </FormControl>
      <Menu anchorEl={anchorEl} open={open}>
        {component({ handleClose })}
      </Menu>
    </div>
  );
};

export default FilterDropdown;
