import React             from 'react';
import { Provider      } from 'react-redux';
import { render        } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Root          } from './Crud/Root';
import store             from './Crud/store';

render(
    <BrowserRouter>
      <Provider store={store}>
        <Root />
      </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
