import * as Component from './MDMUIComponentSelectors'
import MDMTextBoxWrapper from "../MDMComponents/MDMTextBox";
import MDMTextArea from "../MDMComponents/MDMTextArea";
import MDMEmailBox from "../MDMComponents/MDMEmailBox";
import MDMRadioButton from "../MDMComponents/MDMRadioButton";
import MDMCheckBox from "../MDMComponents/MDMCheckBox";
import MDMCheckBoxGroup from "../MDMComponents/MDMCheckBoxGroup";
import MDMNumberBox from "../MDMComponents/MDMNumberBox";
import MDMDatePicker from "../MDMComponents/MDMDatePicker";
import MDMMonthPicker from "../MDMComponents/MDMMonthPicker";
import MDMRangePicker from "../MDMComponents/MDMRangePicker";
import MDMTimePicker from "../MDMComponents/MDMTimePicker";
import MDMPasswordBox from "../MDMComponents/MDMPasswordBox";
import GridViewHOC from "../../UI/AgGrid/GridView";
import MDMMultipleAddFieldWrapper from "../MDMComponents/MDMMultipleAddField";
import MDMCascaderWrapper from "../MDMComponents/MDMCascader";
import MDMMultiSelectBoxWrapper from "../MDMComponents/MDMMuiltSelectBox";
import MDMSearchBoxWrapper from "../MDMComponents/MDMSearchBox";
import MDMUploadWrapper from "../MDMComponents/MDMUploader";
import AndtDTextBoxWrapper from "../MDMAntdWrappers/TextBoxWrapper";
import AndtDTextAreaWrapper from "../MDMAntdWrappers/TextAreaWrapper";
import AndtDRichTextAreaWrapper from "../MDMAntdWrappers/RichTextAreaWrapper";
import AndtDSelectBoxWrapper from "../MDMAntdWrappers/SelectBoxWrapper";
import AndtDEmailBoxWrapper from "../MDMAntdWrappers/EmailBoxWrapper";
import AndtDRadioButtonWrapper from "../MDMAntdWrappers/RadioButtonWrapper";
import AndtDCheckBoxGroupWrapper from "../MDMAntdWrappers/CheckBoxGroupWrapper";
import AndtDCheckBoxWrapper from "../MDMAntdWrappers/CheckBoxWrapper";
import AndtDNumberBoxWrapper from "../MDMAntdWrappers/NumberBoxWrapper";
import AndtDDatePickerWrapper from "../MDMAntdWrappers/DatePickerWrapper";
import AndtDMonthPickerWrapper from "../MDMAntdWrappers/MonthPickerWrapper";
import AndtDRangePickerWrapper from "../MDMAntdWrappers/RangePickerWrapper";
import AndtDTimePickerWrapper from "../MDMAntdWrappers/TimePickerWrapper";
import AndtDPasswordBoxWrapper from "../MDMAntdWrappers/PasswordBoxWrapper";
import GridViewWrapper from "../../UI/AgGrid/GridViewWrapper";
import AndtDMultiEmailWrapper from "../MDMAntdWrappers/MultipleEmailWrapper";
import AndtDMultiPhoneWrapper from "../MDMAntdWrappers/MultiplePhoneWrapper";
import AndtDMultiMobileWrapper from "../MDMAntdWrappers/MultipleMobileWrapper";
import AndtDCascaderWrapper from "../MDMAntdWrappers/CascaderWrapper";
import AndtDMultipleSelectBoxWrapper from "../MDMAntdWrappers/MultipleSelectBox";
import AndtDWebsiteWrapper from '../MDMAntdWrappers/WebsiteWrapper'
import AndtDSearchBoxWrapper from '../MDMAntdWrappers/SearchBoxWrapper'
import AndtDUploadWrapper from "../MDMAntdWrappers/FileUploadWrapper"

/**
 * HOC binding base on field type
 */

export const component_mapping = {
    [Component.TEXTBOX]: MDMTextBoxWrapper(AndtDTextBoxWrapper),
    [Component.TEXTAREA]: MDMTextArea(AndtDTextAreaWrapper),
    [Component.RICHTEXTAREA]: MDMTextArea(AndtDRichTextAreaWrapper),
    [Component.SELECT]: MDMTextBoxWrapper(AndtDSelectBoxWrapper),
    [Component.EMAIL]: MDMEmailBox(AndtDEmailBoxWrapper),
    [Component.RADIO]: MDMRadioButton(AndtDRadioButtonWrapper),
    [Component.CHECKBOXGROUP]: MDMCheckBoxGroup(AndtDCheckBoxGroupWrapper),
    [Component.CHECKBOX]: MDMCheckBox(AndtDCheckBoxWrapper),
    [Component.NUMBER]: MDMNumberBox(AndtDNumberBoxWrapper),
    [Component.DATE]: MDMDatePicker(AndtDDatePickerWrapper),
    [Component.MONTH]: MDMMonthPicker(AndtDMonthPickerWrapper),
    [Component.RANGE]: MDMRangePicker(AndtDRangePickerWrapper),
    [Component.TIME]: MDMTimePicker(AndtDTimePickerWrapper),
    [Component.PASSWORD]: MDMPasswordBox(AndtDPasswordBoxWrapper),
    [Component.CONFIRMPASSWORD]: MDMPasswordBox(AndtDPasswordBoxWrapper),
    [Component.GridView]: GridViewHOC(GridViewWrapper),
    [Component.MULTIEMAIL]: MDMMultipleAddFieldWrapper(AndtDMultiEmailWrapper),
    [Component.MULTIPHONE]: MDMMultipleAddFieldWrapper(AndtDMultiPhoneWrapper),
    [Component.MULTIMOBILE]: MDMMultipleAddFieldWrapper(AndtDMultiMobileWrapper),
    [Component.CASCADER]: MDMCascaderWrapper(AndtDCascaderWrapper),
    [Component.MUTLIPLESELECT]: MDMMultiSelectBoxWrapper(AndtDMultipleSelectBoxWrapper),
    [Component.WEBSITE]: MDMTextBoxWrapper(AndtDWebsiteWrapper),
    [Component.SEARCH]: MDMSearchBoxWrapper(AndtDSearchBoxWrapper),
    [Component.FILEUPLOAD]: MDMUploadWrapper(AndtDUploadWrapper),
};
