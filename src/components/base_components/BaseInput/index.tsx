import { Input, message } from 'antd';

interface Props {
  value: string | number | undefined;
  onChange: Function;
  type?: 'string' | 'number';
  loading?: boolean;
  disabled?: boolean;
  style?: object;
  width?: number;
  placeholder?: string;
  addonBefore?: any;
  addonAfter?: any;
  maxLength?: number | undefined;
  allowClear?: boolean;
  status?: 'error' | 'warning' | undefined;
}

const reg = /^-?\d*(\.\d*)?$/;

const BaseInput = (props: Props) => {
  const {
    type = 'string',
    value = '',
    onChange = () => {},
    disabled = false,
    width = '100%',
    placeholder = '',
    style = {},
    addonBefore = null,
    addonAfter = null,
    maxLength = undefined,
    allowClear = true,
    status = undefined,
  } = props;

  const changeValue = (value: any) => {
    if (type === 'number') {
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        onChange(value);
      } else {
        message.error('请输入数字!');
      }
    } else {
      onChange(value);
    }
  };

  return (
    <Input
      value={value}
      onChange={(e) => changeValue(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      maxLength={maxLength}
      allowClear={allowClear}
      status={status}
      style={{
        width,
        ...style,
      }}
    />
  );
};

export default BaseInput;
