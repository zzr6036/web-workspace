import { createRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ActionLinkButton, Alert, AreaChart, Avatar, Badge, BarChart, Breadcrumb, Button, Card, CardBody, Checkbox, Col, Content, Dialog, Divider, DonutChart, Drawer, Dropdown, DualAxisChart, Empty, EventCarousel, FilterTabs, Flex, GroupedBarChart, Header, HorizontalBarChart, Input, Layout, LineChart, Link, Menu, Pagination, Paragraph, PieChart, Progress, RadioGroup, Result, Row, SectionHeading, Select, Sider, Skeleton, Space, Spinner, StackedBarChart, StackedBarLineChart, Steps, Switch, Table, Tabs, Tag, Text, Textarea, Title, Tooltip, UIProvider, VerticalBarChart, WhatsAppButton, WhatsAppIcon } from '../index';
import { localizeStoryArgs } from '../../.storybook/localizeStory';

describe('Elij UI components', () => {
  it('renders common navigation and layout helpers', async () => {
    const onChange = vi.fn();
    render(<><SectionHeading eyebrow="Overview" title="Reusable layout" description="Description" /><FilterTabs items={[{ id: 'all', label: 'All' }, { id: 'featured', label: 'Featured' }]} activeKey="all" onChange={onChange} /><ActionLinkButton href="#details" icon={<span>→</span>}>Details</ActionLinkButton></>);
    expect(screen.getByRole('heading', { name: 'Reusable layout' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.setup().click(screen.getByRole('button', { name: 'Featured' }));
    expect(onChange).toHaveBeenCalledWith('featured');
    expect(screen.getByRole('link', { name: /Details/ })).toHaveAttribute('href', '#details');
  });

  it('renders prop-driven WhatsApp and event media components', () => {
    render(<><WhatsAppButton href="https://wa.me/123" icon={<span aria-hidden="true">W</span>}>Enquire</WhatsAppButton><EventCarousel title="Wedding" media={[{ src: '/photo.jpg', alt: 'Photo' }, { src: '/clip.mp4', type: 'video', alt: 'Clip' }]} /></>);
    expect(screen.getByRole('link', { name: /enquire/i })).toHaveAttribute('href', 'https://wa.me/123');
    expect(screen.getByAltText('Photo')).toBeInTheDocument();
    expect(screen.getByLabelText('Clip')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next photo' })).toBeInTheDocument();
  });

  it('renders the reusable WhatsApp icon with accessible semantics', () => {
    const { container } = render(<WhatsAppIcon title="WhatsApp" size={32} />);
    expect(screen.getByRole('img', { name: 'WhatsApp' })).toHaveAttribute('width', '32');
    expect(container.querySelector('svg path')).toBeInTheDocument();
  });

  it('forwards a ref from Button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Save' }));
  });

  it('connects Input label, helper text, and error semantics', () => {
    const { rerender } = render(<Input label="Email" helperText="Required" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Required');
    rerender(<Input label="Email" error errorMessage="Invalid email" />);
    expect(screen.getByLabelText('Email')).toBeInvalid();
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Invalid email');
  });

  it('connects Textarea label and helper text', () => {
    render(<Textarea label="Message" helperText="500 characters maximum" />);
    expect(screen.getByLabelText('Message')).toHaveAccessibleDescription('500 characters maximum');
  });

  it('changes a Checkbox with its visible label', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('emits RadioGroup value changes', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RadioGroup label="Channel" options={[{ label: 'Email', value: 'email' }, { label: 'SMS', value: 'sms' }]} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('radio', { name: 'SMS' }));
    expect(onValueChange).toHaveBeenCalledWith('sms');
  });

  it('supports uncontrolled Switch state', async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);
    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect(control).not.toBeChecked();
    await user.click(control);
    expect(control).toBeChecked();
  });

  it('renders Select options and changes value', async () => {
    const user = userEvent.setup();
    render(<Select label="Country" options={[{ label: 'Singapore', value: 'sg' }, { label: 'Japan', value: 'jp' }]} />);
    const select = screen.getByLabelText('Country');
    await user.selectOptions(select, 'jp');
    expect(select).toHaveValue('jp');
  });

  it('renders Badge and Card content', () => {
    render(<Card><CardBody><Badge variant="success">Active</Badge></CardBody></Card>);
    expect(screen.getByText('Active')).toBeVisible();
  });

  it('dismisses Alert using localized accessible text', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<UIProvider locale="zh-CN"><Alert onDismiss={onDismiss}>提示内容</Alert></UIProvider>);
    await user.click(screen.getByRole('button', { name: '关闭' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('provides a localized Spinner label', () => {
    render(<UIProvider locale="zh-CN"><Spinner /></UIProvider>);
    expect(screen.getByRole('status', { name: '加载中' })).toBeVisible();
  });

  it('localizes navigation and status semantics in Chinese', () => {
    render(<UIProvider locale="zh-CN"><Breadcrumb items={[{ label: '首页' }]} /><Menu items={[{ key: 'home', label: '首页' }]} /><Tabs items={[{ key: 'one', label: '概览', children: '内容' }]} /><Steps items={[{ title: '开始' }]} /><Pagination current={2} total={30} onChange={() => undefined} /><Progress percent={50} /></UIProvider>);
    expect(screen.getByRole('navigation', { name: '面包屑导航' })).toBeVisible();
    expect(screen.getByRole('menu', { name: '菜单' })).toBeVisible();
    expect(screen.getByRole('tablist', { name: '标签页' })).toBeVisible();
    expect(screen.getByRole('list', { name: '步骤' })).toBeVisible();
    expect(screen.getByRole('navigation', { name: '分页' })).toBeVisible();
    expect(screen.getByRole('button', { name: '上一页' })).toBeVisible();
    expect(screen.getByRole('button', { name: '第 3 页' })).toBeVisible();
    expect(screen.getByRole('button', { name: '下一页' })).toBeVisible();
    expect(screen.getByRole('progressbar', { name: '进度' })).toBeVisible();
  });

  it('localizes nested Storybook args without changing English args', () => {
    const args = { label: 'Country', children: 'Button', options: [{ label: 'Singapore', value: 'sg' }], trigger: <Button>Actions</Button> };
    expect(localizeStoryArgs(args, 'en')).toBe(args);
    const localized = localizeStoryArgs(args, 'zh-CN');
    expect(localized.label).toBe('国家或地区');
    expect(localized.children).toBe('按钮');
    expect(localized.options[0].label).toBe('新加坡');
    render(localized.trigger);
    expect(screen.getByRole('button', { name: '操作' })).toBeVisible();
  });

  it('renders Divider separator orientation', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('closes Dialog with Escape and restores focus', async () => {
    const user = userEvent.setup();
    function Example() {
      const [open, setOpen] = useState(false);
      return <><Button onClick={() => setOpen(true)}>Open</Button><Dialog open={open} onOpenChange={setOpen} title="Settings">Content</Dialog></>;
    }
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
  });
});

describe('Ant Design inspired component suite', () => {
  it('renders chart variants with localized labels and states', () => {
    const data = [{ month: 'Jan', sales: 10 }]; const series = [{ dataKey: 'sales', name: 'Sales' }];
    render(<UIProvider locale="zh-CN"><LineChart data={data} series={series} xKey="month" /><BarChart data={data} series={series} xKey="month" ariaLabel="销售柱状图" /><AreaChart data={[]} series={series} xKey="month" /><PieChart data={data} nameKey="month" valueKey="sales" /><DonutChart data={data} nameKey="month" valueKey="sales" /></UIProvider>);
    expect(screen.getAllByRole('img', { name: '图表' })).toHaveLength(2);
    expect(screen.getByRole('img', { name: '销售柱状图' })).toBeVisible();
    expect(screen.getByText('暂无数据')).toBeVisible();
    expect(screen.getByRole('img', { name: '饼图' })).toBeVisible();
    expect(screen.getByRole('img', { name: '环形图' })).toBeVisible();
  });

  it('renders advanced bar and combination chart variants', () => {
    const data = [{ month: 'Jan', sales: 10, users: 4 }]; const series = [{ dataKey: 'sales', name: 'Sales' }, { dataKey: 'users', name: 'Users' }];
    render(<UIProvider locale="zh-CN"><StackedBarChart data={data} series={series} xKey="month" ariaLabel="堆叠柱状图" /><StackedBarLineChart data={data} barSeries={series} lineSeries={[series[1]]} xKey="month" /><VerticalBarChart data={data} series={series} xKey="month" ariaLabel="竖向柱状图" /><HorizontalBarChart data={data} series={series} xKey="month" /><GroupedBarChart data={data} series={series} xKey="month" ariaLabel="分组柱状图" /><DualAxisChart data={data} barSeries={[series[0]]} lineSeries={[series[1]]} xKey="month" /></UIProvider>);
    expect(screen.getByRole('img', { name: '堆叠柱状图' })).toBeVisible(); expect(screen.getByRole('img', { name: '组合图' })).toBeVisible(); expect(screen.getByRole('img', { name: '竖向柱状图' })).toBeVisible(); expect(screen.getByRole('img', { name: '横向条形图' })).toBeVisible(); expect(screen.getByRole('img', { name: '分组柱状图' })).toBeVisible(); expect(screen.getByRole('img', { name: '双轴图' })).toBeVisible();
  });
  it('renders typography and composition layout components', () => {
    render(<Layout><Header>Header</Header><Layout><Sider>Side</Sider><Content><Title>Title</Title><Paragraph><Text>Body</Text> <Link href="#docs">Docs</Link></Paragraph><Space><span>A</span><span>B</span></Space><Flex><span>C</span></Flex><Row><Col span={12}>Half</Col></Row></Content></Layout></Layout>);
    expect(screen.getByRole('heading', { name: 'Title' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '#docs');
    expect(screen.getByText('Half')).toBeVisible();
  });

  it('renders Avatar fallback and closes Tag', async () => {
    const user = userEvent.setup(); const onClose = vi.fn();
    render(<><Avatar>EJ</Avatar><Tag closable onClose={onClose}>Featured</Tag></>);
    expect(screen.getByText('EJ')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('selects Menu items and supports keyboard movement', async () => {
    const user = userEvent.setup(); const onSelect = vi.fn();
    render(<Menu items={[{ key: 'home', label: 'Home' }, { key: 'projects', label: 'Projects' }]} onSelect={onSelect} />);
    const home = screen.getByRole('menuitem', { name: 'Home' });
    home.focus(); await user.keyboard('{ArrowDown}{Enter}');
    expect(screen.getByRole('menuitem', { name: 'Projects' })).toHaveFocus();
    await user.click(screen.getByRole('menuitem', { name: 'Projects' }));
    expect(onSelect).toHaveBeenCalledWith('projects');
  });

  it('opens Dropdown and selects an item', async () => {
    const user = userEvent.setup(); const onSelect = vi.fn();
    render(<Dropdown trigger={<Button>Actions</Button>} items={[{ key: 'edit', label: 'Edit' }]} onSelect={onSelect} />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onSelect).toHaveBeenCalledWith('edit');
  });

  it('changes Tabs with keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Tabs items={[{ key: 'one', label: 'One', children: 'First panel' }, { key: 'two', label: 'Two', children: 'Second panel' }]} />);
    screen.getByRole('tab', { name: 'One' }).focus(); await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
  });

  it('renders accessible Breadcrumb, Pagination, and Steps', async () => {
    const user = userEvent.setup(); const onPage = vi.fn(); const onStep = vi.fn();
    render(<><Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Current' }]} /><Pagination current={2} total={40} pageSize={10} onChange={onPage} /><Steps current={1} onChange={onStep} items={[{ title: 'Start' }, { title: 'Review' }]} /></>);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Page 3' })); expect(onPage).toHaveBeenCalledWith(3);
    await user.click(screen.getByRole('button', { name: /Start/ })); expect(onStep).toHaveBeenCalledWith(0);
  });

  it('shows Tooltip on focus', async () => {
    const user = userEvent.setup(); render(<Tooltip title="Helpful" delay={0}><Button>Info</Button></Tooltip>);
    await user.tab(); expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful');
  });

  it('renders Table data and localized Empty state', () => {
    const columns = [{ key: 'name', title: 'Name', dataIndex: 'name' as const }];
    render(<UIProvider locale="zh-CN"><Table<{ id: number; name: string }> columns={columns} data={[]} rowKey="id" /><Empty /></UIProvider>);
    expect(screen.getAllByText('暂无数据')).toHaveLength(2);
  });

  it('renders Skeleton, Progress, and Result status semantics', () => {
    render(<><Skeleton data-testid="skeleton" /><Progress percent={68} label="Upload" /><Result status="success" title="Complete" /></>);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute('aria-valuenow', '68');
    expect(screen.getByRole('heading', { name: 'Complete' })).toBeVisible();
  });

  it('closes Drawer with Escape and restores focus', async () => {
    const user = userEvent.setup();
    function DrawerExample() { const [open, setOpen] = useState(false); return <><Button onClick={() => setOpen(true)}>Open drawer</Button><Drawer open={open} onOpenChange={setOpen} title="Settings">Content</Drawer></>; }
    render(<DrawerExample />); const trigger = screen.getByRole('button', { name: 'Open drawer' }); await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeVisible(); fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); expect(trigger).toHaveFocus();
  });
});
