import React from 'react';
import { Heading } from '@mycrypto/ui';

import { FlippablePanel } from 'v2/components';
import { Layout } from 'v2/features';
import { AddAccount, AddressBook, AddToAddressBook, GeneralSettings } from './components';
import './Settings.scss';

// Legacy
import settingsIcon from 'common/assets/images/icn-settings.svg';
import { AccountList } from '../components';
import { AccountContext, AddressMetadataContext } from 'v2/providers';

export default function Settings() {
  return (
    <Layout className="Settings">
      <Heading className="Settings-heading">
        <img src={settingsIcon} alt="Settings" className="Settings-heading-icon" />
        Settings
      </Heading>
      <FlippablePanel>
        {({ flipped }) =>
          flipped ? (
            <AddressMetadataContext.Consumer>
              {({}) => <AddAccount />}
            </AddressMetadataContext.Consumer>
          ) : (
            <AccountContext.Consumer>
              {({ accounts }) => <AccountList accounts={accounts} />}
            </AccountContext.Consumer>
          )
        }
      </FlippablePanel>
      <AddressMetadataContext.Consumer>
        {({ createAddressMetadatas, addressMetadata, deleteAddressMetadatas }) => (
          <FlippablePanel>
            {({ flipped, toggleFlipped }) =>
              flipped ? (
                <AddToAddressBook
                  toggleFlipped={toggleFlipped}
                  createAddressMetadatas={createAddressMetadatas}
                />
              ) : (
                <AddressBook
                  addressMetadata={addressMetadata}
                  toggleFlipped={toggleFlipped}
                  deleteAddressMetadatas={deleteAddressMetadatas}
                />
              )
            }
          </FlippablePanel>
        )}
      </AddressMetadataContext.Consumer>
      <GeneralSettings />
    </Layout>
  );
}