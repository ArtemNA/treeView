import { AccountsComponent } from './accounts.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Account, AccountFlatNode } from '../../core/interfaces/model';
import { AccountActions } from '../../core/state/actions/account.actions';
import { AccountState } from '../../core/state/reducers/account.reducers';
import { MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let store: Store<AccountState>;
  let mockAccounts: Account;

  beforeEach(() => {
    mockAccounts =
      {
        id: 1,
        name: 'Test Account',
        index_name: 'test account',
        accounts: [
          {
            id: 2,
            name: 'Test Account2',
            index_name: 'test account2',
            accounts: []
          }
        ]
      };
    store = ({
      select: jest.fn().mockReturnValue(of([mockAccounts])),
      dispatch: jest.fn()
    } as unknown) as Store<AccountState>;
    component = new AccountsComponent(store);
  });

  it('should initialize the component', () => {
    component.ngOnInit();
    expect(component.dataSource.data).toEqual([]);
    expect(component.search.value).toEqual({ select: component.searchKeys[1], input: '' });
    expect(store.dispatch).toHaveBeenCalledWith(AccountActions.getAccountData());
  });

  it('should select the correct state and transform it', () => {
    component.accountsList$.subscribe((res) => {
      expect(res).toEqual([mockAccounts]);
      expect(component.dataSource.data).toEqual([mockAccounts]);
    });
  });

  describe('TreeControl and TreeFlattener', () => {
    let treeControl: FlatTreeControl<AccountFlatNode>;
    let treeFlattener: MatTreeFlattener<Account, AccountFlatNode>;

    beforeEach(() => {
      component['_transformer'] = jest.fn();
      treeControl = new FlatTreeControl<AccountFlatNode>(
        node => node.level,
        node => node.expandable
      );
      treeFlattener = new MatTreeFlattener(
        component['_transformer'],
        node => node.level,
        node => node.expandable,
        node => node.accounts
      );
    });

    it('should create an instance of TreeControl', () => {
      expect(treeControl).toBeTruthy();
    });

    it('should create an instance of TreeFlattener', () => {
      expect(treeFlattener).toBeTruthy();
    });
    it('should set the level getter of the FlatTreeControl', () => {
      const node = { level: 1 };
      expect(treeControl.getLevel(<AccountFlatNode>node)).toEqual(1);
    });

    it('should set the expandable getter of the FlatTreeControl', () => {
      const node = { expandable: true };
      expect(treeControl.isExpandable(<AccountFlatNode>node)).toEqual(true);
    });

    it('should set the level getter of the MatTreeFlattener', () => {
      const node = { level: 2 };
      expect(treeFlattener.getLevel(<AccountFlatNode>node)).toEqual(2);
    });

    it('should set the expandable getter of the MatTreeFlattener', () => {
      const node = { expandable: false };
      expect(treeFlattener.isExpandable(<AccountFlatNode>node)).toEqual(false);
    });
  });

  it('should correctly check if the node has a child', () => {
    const node: AccountFlatNode = {
      expandable: true,
      name: 'Test Account',
      id: 1,
      level: 0,
      searched: false
    };
    expect(component.hasChild(0, node)).toBe(true);

    node.expandable = false;
    expect(component.hasChild(0, node)).toBe(false);
  });

  it('should filter the accounts list', () => {
    const filteredData = [
      {
        id: 1,
        name: 'Test Account',
        index_name: 'test account',
        accounts: [
          {
            id: 2,
            name: 'Test Account2',
            index_name: 'test account2',
            accounts: []
          }
        ],
        searched: true
      }
    ];
    component.data = [mockAccounts];
    component['filterTree']('Test', 'name');
    expect(component.dataSource.data).toEqual(filteredData);
  });

  it('should apply the filter', () => {
    component['filterTree'] = jest.fn();
    jest.spyOn(component.treeControl, 'expandAll').mockReturnValue();
    component['applyFilter']();
    component.search.setValue({ select: 'name', input: 'Test' });
    expect(component['filterTree']).toHaveBeenCalledWith('Test', 'name');
    expect(component.treeControl.expandAll).toHaveBeenCalled();
    jest.clearAllMocks()
  });

  it('should apply the filter and collapse all', () => {
    component['filterTree'] = jest.fn();
    jest.spyOn(component.treeControl, 'collapseAll').mockReturnValue();
    component['applyFilter']();
    component.search.setValue({ select: 'name', input: '' });
    expect(component['filterTree']).toHaveBeenCalledWith('', 'name');
    expect(component.treeControl.collapseAll).toHaveBeenCalled();
  });

  it('should call filterRecursive without search string', () => {
    const res = component['filterRecursive']('', [mockAccounts], 'name');
    expect(res).toEqual([mockAccounts])
  });

  it('should highlight search string', () => {
    const res = component['filterRecursive']('2', [mockAccounts], 'name');
    expect(res).toEqual([{...mockAccounts, accounts: [{...mockAccounts.accounts![0], searched: true}]}])
  });

  it('ngOnDestroy', () => {
    jest.spyOn(component.destroy$, 'next').mockImplementation(() => {});
    jest.spyOn(component.destroy$, 'complete').mockImplementation(() => {});
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  })
});
