import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo, QueryRef, ApolloModule } from 'apollo-angular';

interface EmptyObject {
  // Define any properties that represent an empty object
}

interface GraphQLResponse<T> {
  [key: string]: T;
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlGeneralService {
  constructor(private apollo: Apollo) {}

  executeQuery<TInput extends EmptyObject, TOutput>(
    url: string,
    query: string,
    variables: TInput,
  ): Observable<TOutput> {
    return this.apollo
      .query<GraphQLResponse<TOutput>, TInput>({
        query: gql`
          ${query}
        `,
        variables: variables,
      })
      .pipe(
        map((result) => {
          if (result.errors && result.errors.length > 0) {
            const errorMessage = result.errors.map((error) => error.message).join(', ');
            throw new Error(`GraphQL Error: ${errorMessage}`);
          }
          if (!result.data) {
            throw new Error('No data returned from GraphQL query.');
          }

          return result.data as unknown as TOutput;
        }),
        catchError((error) => {
          console.error('Error in executeQuery:', error);
          return throwError(() => error);
        }),
      );
  }

  fetchData<T, R>(url: string, query: string, variables: any = {}): Observable<R> {
    return this.executeQuery<any, GraphQLResponse<R>>(url, query, variables).pipe(
      map((result) => {
        const key = Object.keys(result)[0];
        return result[key];
      }),
    );
  }

  private generateQuery<TInput extends Record<string, any>>(
    modelName: string,
    variables: TInput,
  ): string {
    if (typeof variables === 'object' && variables !== null) {
      const fields = this.generateFields(variables);
      return `
        query ${modelName}(${this.generateVariables(variables)}) {
          ${modelName}(${fields})
        }
      `;
    } else {
      return '';
    }
  }

  private generateVariables(variables: Record<string, any>): string {
    return Object.keys(variables)
      .map((variable) => `$${variable}: ${this.getType(variables[variable])}`)
      .join(', ');
  }

  private generateFields(variables: Record<string, any> | unknown): string {
    if (typeof variables === 'object' && variables !== null) {
      return Object.keys(variables)
        .map((variable) => {
          const nestedFields = this.generateFields((variables as Record<string, any>)[variable]);
          return `${variable} { ${nestedFields} }`;
        })
        .join('\n');
    } else {
      return '';
    }
  }

  private getType(value: any): string {
    if (Array.isArray(value)) {
      return `[${this.getType(value[0])}]`;
    } else if (typeof value === 'object') {
      return 'JSON';
    } else {
      return typeof value;
    }
  }
}
