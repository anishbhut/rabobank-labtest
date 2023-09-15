import { fireEvent, render, screen, waitFor } from '@testing-library/reactRaboBank';
import '@testing-library/jest-dom'

import RaboBankTransaction from './RaboBankTransaction';

test('Renders RaboBankTransaction Page Title', () => {
    render(<RaboBankTransaction />);
    const pageTitle = screen.queryAllByText('Rabobank Customer Statement Processor')
    expect(pageTitle).toHaveLength(1) 
});

test('Renders RaboBankTransaction Data Component with Select Button', () => {
    render(<RaboBankTransaction />);
    const SelectFileBtn = screen.queryAllByText('Select a file')
    expect(SelectFileBtn).toHaveLength(1) 
});

test('Renders RaboBankTransaction Data Component with Validate Data button', () => {
    render(<RaboBankTransaction />);
    const validateFileBtn = screen.queryAllByText('Validate Data')
    expect(validateFileBtn).toHaveLength(1) 
});