// 1. Query Básica com Axios

// Vamos começar com uma consulta simples para buscar dados de uma API qualquer, como uma lista de itens.

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItems = async () => {
  const response = await axios.get('https://api.example.com/items');
  return response.data;
};

function ItemList() {
  const { data, error, isLoading } = useQuery(['items'], fetchItems);

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}


// 2. Query com Parâmetros Dinâmicos (Filtro) usando Axios

// Agora, vamos adicionar um filtro para que a lista de itens possa ser filtrada por um parâmetro, como uma categoria.

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItemsByCategory = async (category) => {
  const response = await axios.get(`https://api.example.com/items`, {
    params: { category }
  });
  return response.data;
};

function ItemListWithFilter() {
  const [category, setCategory] = useState('all');

  const { data, error, isLoading } = useQuery(
    ['items', category],
    () => fetchItemsByCategory(category),
    { keepPreviousData: true } // Mantém dados antigos enquanto a nova query carrega
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="all">Todos</option>
        <option value="electronics">Eletrônicos</option>
        <option value="fashion">Moda</option>
      </select>
      
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

// Explicação

// Usamos axios.get com a opção params para passar os parâmetros da query (neste caso, category).

// O keepPreviousData ajuda a manter os dados anteriores enquanto os novos dados estão sendo carregados, proporcionando uma experiência mais suave para o usuário.





// 3. Paginação com Axios

// Aqui, vamos realizar uma consulta com paginação usando o Axios.

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItemsPage = async (page) => {
  const response = await axios.get(`https://api.example.com/items`, {
    params: { page }
  });
  return response.data;
};

function ItemListWithPagination() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery(
    ['items', page],
    () => fetchItemsPage(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <div>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      
      <div>
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage(old => old + 1)} disabled={isFetching}>
          Próxima
        </button>
      </div>
    </>
  );
}

// Explicação

// A função fetchItemsPage usa o Axios para pegar os dados da página específica.

// O keepPreviousData ajuda a manter os dados da página anterior enquanto a nova página está sendo carregada, garantindo uma transição suave.



// 4. Calendário com Axios

// Agora, vamos buscar eventos em um calendário com base no mês e ano usando Axios.

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCalendarEvents = async (month, year) => {
  const response = await axios.get('https://api.example.com/events', {
    params: { month, year }
  });
  return response.data;
};

function CalendarWithEvents() {
  const [month, setMonth] = useState(1); // Janeiro
  const [year, setYear] = useState(2025);

  const { data, error, isLoading } = useQuery(
    ['calendar', month, year],
    () => fetchCalendarEvents(month, year)
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <div>
        <button onClick={() => setMonth(month > 1 ? month - 1 : 12)}>Mês Anterior</button>
        <button onClick={() => setMonth(month < 12 ? month + 1 : 1)}>Próximo Mês</button>
      </div>

      <div>
        <h2>{data.month} de {year}</h2>
        {data.events.map(event => (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// Explicação

// A função fetchCalendarEvents faz uma requisição GET com os parâmetros month e year.

// A query é gerenciada pelo React Query e renderiza os eventos conforme o mês/ano selecionado.


// 5. Query Avançada com Debounce para Filtros usando Axios

// Por fim, vamos criar uma query com debounce para filtrar itens sem sobrecarregar o servidor, utilizando Axios.

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { debounce } from 'lodash';

const fetchItemsBySearch = async (searchTerm) => {
  const response = await axios.get('https://api.example.com/items', {
    params: { search: searchTerm }
  });
  return response.data;
};

function ItemSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const { data, error, isLoading } = useQuery(
    ['items', debouncedSearchTerm],
    () => fetchItemsBySearch(debouncedSearchTerm),
    { enabled: !!debouncedSearchTerm } // Só ativa a query se o termo de busca não estiver vazio
  );

  const debouncedSetSearchTerm = debounce((term) => setDebouncedSearchTerm(term), 500);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSetSearchTerm(e.target.value);
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Buscar itens..." 
      />
      <ul>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

// Explicação

// Usamos a função debounce do Lodash para evitar que a query seja disparada toda vez que o usuário digitar algo.

// O Axios é usado para enviar a requisição GET para a API com o termo de busca (searchTerm).








//LÓGICA DE HOOKS PERSONALIZADOS:

// 1. Hook para Buscar Itens (Consulta Básica)

// Primeiro, vamos criar um hook para a consulta básica de itens. Esse hook será responsável por fazer a requisição e retornar os dados.

// hooks/useItems.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItems = async () => {
  const response = await axios.get('https://api.example.com/items');
  return response.data;
};

export const useItems = () => {
  return useQuery(['items'], fetchItems);
};


// Agora, você pode usar esse hook em qualquer componente, como abaixo:

import { useItems } from './hooks/useItems';

function ItemList() {
  const { data, error, isLoading } = useItems();

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}



// 4. Hook para Buscar Eventos de Calendário (Consulta com Parâmetros de Mês/Ano)

// Agora, vamos criar um hook para buscar eventos de um calendário com base no mês e ano.

// hooks/useCalendarEvents.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCalendarEvents = async (month, year) => {
  const response = await axios.get('https://api.example.com/events', {
    params: { month, year },
  });
  return response.data;
};

export const useCalendarEvents = (month, year) => {
  return useQuery(['calendar', month, year], () => fetchCalendarEvents(month, year));
};


E aqui está como usar esse hook em um componente de calendário:

import { useCalendarEvents } from './hooks/useCalendarEvents';

function CalendarWithEvents() {
  const [month, setMonth] = useState(1); // Janeiro
  const [year, setYear] = useState(2025);
  const { data, error, isLoading } = useCalendarEvents(month, year);

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <div>
        <button onClick={() => setMonth(month > 1 ? month - 1 : 12)}>Mês Anterior</button>
        <button onClick={() => setMonth(month < 12 ? month + 1 : 1)}>Próximo Mês</button>
      </div>

      <div>
        <h2>{data.month} de {year}</h2>
        {data.events.map(event => (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}


// 2. Hook para Itens com Filtro (Consulta com Parâmetros Dinâmicos)

// Agora, vamos criar um hook para buscar itens com base em um filtro de categoria. Esse hook vai receber um parâmetro dinâmico (category) e buscar os itens filtrados.

// hooks/useItemsByCategory.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItemsByCategory = async (category) => {
  const response = await axios.get('https://api.example.com/items', {
    params: { category },
  });
  return response.data;
};

export const useItemsByCategory = (category) => {
  return useQuery(['items', category], () => fetchItemsByCategory(category), {
    keepPreviousData: true, // Mantém os dados antigos enquanto os novos carregam
  });
};


// Agora, você pode usar esse hook em um componente de filtro de categoria:

import { useItemsByCategory } from './hooks/useItemsByCategory';

function ItemListWithFilter() {
  const [category, setCategory] = useState('all');
  const { data, error, isLoading } = useItemsByCategory(category);

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="all">Todos</option>
        <option value="electronics">Eletrônicos</option>
        <option value="fashion">Moda</option>
      </select>
      
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

// 3. Hook para Paginação (Consulta com Paginação)

// Se você estiver lidando com dados paginados, crie um hook para lidar com a lógica de paginação.

// hooks/usePaginatedItems.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItemsPage = async (page) => {
  const response = await axios.get('https://api.example.com/items', {
    params: { page },
  });
  return response.data;
};

export const usePaginatedItems = (page) => {
  return useQuery(['items', page], () => fetchItemsPage(page), {
    keepPreviousData: true,
  });
};


// Agora, use esse hook em um componente de paginação:

import { usePaginatedItems } from './hooks/usePaginatedItems';

function ItemListWithPagination() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = usePaginatedItems(page);

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <div>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      
      <div>
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage(old => old + 1)} disabled={isFetching}>
          Próxima
        </button>
      </div>
    </>
  );
}