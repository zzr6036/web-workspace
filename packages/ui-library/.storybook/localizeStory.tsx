import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

const zhCN: Record<string, string> = {
  'A message is required.': '消息为必填项。', 'Accept terms': '接受条款', Actions: '操作',
  'Actions ▾': '操作 ▾', Active: '启用', Activity: '动态', Australia: '澳大利亚',
  'Basic information': '基本信息', Button: '按钮',
  Cancel: '取消', Clear: '清除', Complete: '完成', Confirm: '确认',
  'Confirm action': '确认操作', Content: '内容', Country: '国家或地区',
  'Could not save': '无法保存', 'Create item': '创建项目', Delete: '删除', Details: '详情',
  Disabled: '禁用', Done: '完成',
  Duplicate: '复制', Edit: '编辑', Email: '电子邮箱', Engineer: '工程师', Featured: '推荐',
  Failed: '失败', 'Finish setup': '完成设置', Footer: '页脚', Header: '页头', Heading: '标题',
  Home: '首页', Japan: '日本', 'Maximum 500 characters.': '最多输入 500 个字符。',
  'Monthly performance': '月度表现', Sales: '销售额', Users: '用户数',
  'Sales distribution': '销售额分布',
  'Learn more': '了解更多', Menu: '菜单', Message: '消息', Name: '姓名', Navigation: '导航',
  New: '新建', 'Notification channel': '通知渠道', Notifications: '通知',
  'Open dialog': '打开对话框', 'Open drawer': '打开抽屉',
  One: '一', Overview: '概览', Pending: '待处理', 'Project summary': '项目摘要',
  Projects: '项目', Published: '已发布',
  Refresh: '刷新', Review: '审核', Role: '角色', Save: '保存', Settings: '设置',
  Singapore: '新加坡', Status: '状态', 'Team members': '团队成员', Three: '三', Two: '二',
  'Try again in a moment.': '请稍后重试。', 'Update available': '有可用更新',
  'Write your message': '请输入消息', 'Your changes have been saved.': '你的更改已保存。',
  'Your receipt has been sent by email.': '收据已通过电子邮件发送。',
  'you@example.com': 'name@example.com',
  'This action can be changed later.': '此操作稍后仍可更改。',
  'Review the details before continuing.': '继续前请检查详细信息。',
  'Drawer content belongs here.': '抽屉内容显示在这里。',
  'Enter a valid email address.': '请输入有效的电子邮箱地址。',
  'Enable notifications': '启用通知', 'Confirm settings': '确认设置',
  'Clear typography creates a useful visual hierarchy.': '清晰的排版可建立明确的视觉层级。',
  'Secondary text': '次要文本', 'Project overview content.': '项目概览内容。',
  'Recent activity content.': '最近活动内容。', 'Settings content.': '设置内容。',
  'Upload progress': '上传进度', 'Payment complete': '支付完成',
  'Back to home': '返回首页', 'Something went wrong': '出现错误',
  'Helpful contextual information': '实用的上下文信息', 'Focus or hover': '聚焦或悬停',
  'No data': '暂无数据', 'Push notification': '推送通知',
  'Refresh the page to use the latest version.': '刷新页面以使用最新版本。',
  'Reusable content inside a structured surface.': '结构化容器中的可复用内容。',
  'Saved': '已保存', 'Select a country': '请选择国家或地区',
  'Select a country.': '请选择国家或地区。', 'Used to localize your experience.': '用于提供本地化体验。',
  'We will never share your email.': '我们不会分享你的电子邮箱。',
};

function localizeNode(value: unknown): unknown {
  if (typeof value === 'string') return zhCN[value] ?? value;
  if (Array.isArray(value)) return value.map(localizeNode);
  if (isValidElement(value)) {
    const element = value as ReactElement<{ children?: ReactNode }>;
    if (element.props.children === undefined) return element;
    return cloneElement(element, undefined, localizeNode(element.props.children) as ReactNode);
  }
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeNode(item)]));
  }
  return value;
}

export function localizeStoryArgs<T extends Record<string, unknown>>(args: T, locale: string): T {
  return locale === 'zh-CN' ? localizeNode(args) as T : args;
}
