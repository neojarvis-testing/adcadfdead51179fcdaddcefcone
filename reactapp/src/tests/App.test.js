import { fireEvent, getByPlaceholderText, render, screen } from '@testing-library/react';
import App from '../App';
import NoteForm from '../components/NoteForm';
import NoteDisplay from '../components/NoteDisplay';

test('renders_with_title_and_heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Keep Notes/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement1 = screen.getByText(/Create a Note/i);
  expect(linkElement1).toBeInTheDocument();
});


test('form_input_fields', () => {
 render(
    <NoteForm/>
  );
  // Check if the form fields are displayed
  expect(screen.getByPlaceholderText('Title (required)')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description (required)')).toBeInTheDocument();
  expect(screen.getByText('Add Note')).toBeInTheDocument();

});

test('form_fields_and_submission_with_mock_data', () => {
  const mockSubmit = jest.fn();
  render(<NoteForm onNoteSubmit={mockSubmit} />);

  // Check if the form fields are displayed
  expect(screen.getByPlaceholderText('Title (required)')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description (required)')).toBeInTheDocument();
  expect(screen.getByText('Add Note')).toBeInTheDocument();

  // Simulate user input and form submission
  fireEvent.change(screen.getByPlaceholderText('Title (required)'), {
    target: { value: 'Test Title' },
  });
  fireEvent.change(screen.getByPlaceholderText('Description (required)'), {
    target: { value: 'Test Description' },
  });
  fireEvent.click(screen.getByText('Add Note'));

  // Check if the form submission function was called with the correct data
  expect(mockSubmit).toHaveBeenCalledWith({
    title: 'Test Title',
    description: 'Test Description',
  });
});


test('renders_notedisplay_correctly', () => {
  const mockNotes = [
    { id: 1, title: 'Test Note 1', description: 'Test Description 1' },
    { id: 2, title: 'Test Note 2', description: 'Test Description 2' },
    // Add more mock notes as needed
  ];

  render(<NoteDisplay notes={mockNotes} />);

  // Check if the heading and column names are displayed
  expect(screen.getByText('Notes')).toBeInTheDocument();

  // Check if the note titles and descriptions are displayed
  mockNotes.forEach((note) => {
    expect(screen.getByText(note.title)).toBeInTheDocument();
    expect(screen.getByText(note.description)).toBeInTheDocument();
  });
});


test('submitting_note_and_checking_submit_function', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const addButton = getByText('Add Note');
  // Fill in form fields with data (you can adjust these values)
  fireEvent.change(getByPlaceholderText('Title (required)'), { target: { value: 'Test Title' } });
  fireEvent.change(getByPlaceholderText('Description (required)'), {
    target: { value: 'Test Description' },
  });

  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });
  fireEvent.click(addButton);
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('/addNote'),
    expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Title',
        description: 'Test Description',
      }),
    })
  );

  fetchMock.mockRestore();
});


test('fetching_data_from_api_and_displaying_notes', async () => {
  // Mocked data to simulate the response from the API
  const MOCK_DATA = [
    { id: 1, title: 'Test Note 1', description: 'Test Description 1' },
    { id: 2, title: 'Test Note 2', description: 'Test Description 2' },
  ];

  // Mock the fetch function to return the mocked data
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA),
  });

  const { getByText } = render(<App />);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if each note is displayed in the table
  MOCK_DATA.forEach((note) => {
    expect(getByText(note.title)).toBeInTheDocument();
    expect(getByText(note.description)).toBeInTheDocument();
  });

  // Validate the fetch function call
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('/getAllNote'),
    expect.objectContaining({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
  fetchMock.mockRestore();
});