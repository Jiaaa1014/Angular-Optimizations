###


###
header.component用來指引根元件切換以下兩者

`app-routing.module.ts`
```js   
const routes = [
  { path: 'characters', component: TabsComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: ':side', component: ListComponent }
  ] },
  { path: 'new-character', loadChildren: './create-character/create-character.module.ts#CreateCharacterModule' },
  { path: '**', redirectTo: '/characters' }
];
```