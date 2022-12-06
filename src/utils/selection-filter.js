export default function selectionFilter({ books, articles } = []) {
    return {
      articles: [
        { title: 'Subject Notes', data: articles?.filter((item) => item.genre === 'Subject Notes') },
        { title: 'HandWritten', data: articles?.filter((item) => item.genre === 'HandWritten') },
        { title: 'Gate/PSUs', data: articles?.filter((item) => item.genre === 'Gate/PSUs') },
        { title: 'University', data: articles?.filter((item) => item.genre === 'University') },
        { title: 'New Tech', data: articles?.filter((item) => item.genre === 'New Tech') },
      ],
      books: [
        { title: 'Algorithms', data: books?.filter((item) => item.genre === 'Algorithms') },
        { title: 'Programming for Beginner', data: books?.filter((item) => item.genre === 'Programming for Beginner') },
        { title: 'First Head Programming', data: books?.filter((item) => item.genre === 'First Head Programming') },
        { title: 'University', data: books?.filter((item) => item.genre === 'University') },
        { title: 'New Tech', data: books?.filter((item) => item.genre === 'New Tech') },
      ],
    };
  }