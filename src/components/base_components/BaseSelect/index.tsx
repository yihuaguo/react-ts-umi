import { message, Select } from 'antd';
const { Option } = Select;

interface Props {
  value: any | undefined;
  list: Array<any>;
  onChange: Function;
  mode?: undefined | 'multiple';
  loading?: boolean;
  types?: any[string] | boolean;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  style?: object;
  showArrow?: boolean;
  status?: 'error' | 'warning' | undefined;
}

const BaseSelect = (props: Props) => {
  const {
    mode = undefined,
    loading = false,
    disabled = false,
    value = props.mode === 'multiple' ? [] : '',
    list = [],
    // 设置唯一id和value字段
    types = false,
    onChange = () => {},
    width = '100%',
    style = {},
    showArrow = true,
    status = undefined,
    placeholder = '',
  } = props;

  const id = types ? types[0] : 'id';
  const name = types ? types[1] : 'name';
  const isMultiple = mode === 'multiple';

  const changeValue = (value: any) => {
    if (loading) {
      message.warning('请等待数据加载完成!');
      return;
    }
    if (isMultiple) {
      onChange(value);
    } else {
      const current = list.find((item: any) => item[id] === value);
      onChange(current);
    }
  };

  return (
    <Select
      style={{
        width,
        ...style,
      }}
      status={status}
      loading={loading}
      placeholder={placeholder}
      showSearch={true}
      optionFilterProp="children"
      showArrow={showArrow}
      disabled={disabled}
      mode={isMultiple ? 'multiple' : undefined}
      value={isMultiple ? value : value[id]}
      onChange={(value) => changeValue(value)}
    >
      {list.map((item: any) => (
        <Option key={item[id]} value={item[id]}>
          {item[name]}
        </Option>
      ))}
    </Select>
  );
};

export default BaseSelect;
