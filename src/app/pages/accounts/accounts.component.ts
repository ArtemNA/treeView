import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AccountState } from '../../core/state/reducers/account.reducers';
import { AccountSelectors } from '../../core/state/selectors/account.selectors';
import { AccountActions } from '../../core/state/actions/account.actions';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Account, AccountFlatNode } from '../../core/interfaces/model';
import { first, map, Subject, take, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  accountsList$ = this.store.select(AccountSelectors.selectAccountsList)
    .pipe(
      first((res): res is Account => !!res),
      take(1),
      map(res => [res]),
      tap(res => {
        this.data = res;
        this.dataSource.data = res;
      })
    );

  private _transformer = (node: Account, level: number): AccountFlatNode => {
    return {
      expandable: !!node.accounts && node.accounts.length > 0,
      name: node.name,
      id: node.id,
      level: level,
      searched: node.searched || false
    };
  };
  treeControl = new FlatTreeControl<AccountFlatNode>(
    node => node.level,
    node => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.accounts
  );
  dataSource: MatTreeFlatDataSource<Account, AccountFlatNode> = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  searchKeys: Array<keyof Account> = ['id', 'name'];
  data!: Account[];
  search = new FormControl({ select: this.searchKeys[1], input: '' });
  labels = {
    selectLabel: 'Search by',
    inputLabel: 'Search'
  };

  constructor(private readonly store: Store<AccountState>) { }

  ngOnInit(): void {
    this.store.dispatch(AccountActions.getAccountData());
    this.applyFilter();
  }

  hasChild = (_: number, node: AccountFlatNode): boolean => node.expandable;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterRecursive(filterText: string, array: Account[], prop: typeof this.searchKeys[number]): Account[] {
    let filteredData;
    const copy = (obj: Account): Account => ({ ...obj });
    const filter = (node: Account): boolean => {
      return node[prop]?.toString().toLowerCase().includes(filterText)
        || !!(node.accounts = node.accounts?.map(copy).filter(filter))?.length;
    };
    const highlight = (node: Account): Account => {
      if (node[prop]?.toString().toLowerCase().includes(filterText)) {
        node = { ...node, searched: true };
      } else {
        node = { ...node, accounts: node.accounts?.map(copy).map(highlight) };
      }
      return node;
    };

    if (filterText) {
      filterText = filterText.toLowerCase();
      filteredData = array.map(copy).filter(filter).map(highlight);
    } else {
      filteredData = array;
    }
    return filteredData;
  }

  private filterTree(filterText: string, prop: typeof this.searchKeys[number]): void {
    this.dataSource.data = this.filterRecursive(filterText, this.data, prop);
  }

  private applyFilter(): void {
    this.search.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(change => {
      if (!change) return
      this.filterTree(change.input, change.select);
      if (change.input) {
        this.treeControl.expandAll();
      } else {
        this.treeControl.collapseAll();
      }
    });
  }

}
